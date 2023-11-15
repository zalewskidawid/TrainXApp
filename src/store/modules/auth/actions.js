let timer;
export default {
    async login(context, payload) {
        return context.dispatch('authLogin', {
            ...payload,
            mode: 'login'
        });
    },
    async signup(context, payload) {
        return context.dispatch('authSignUp', {
            ...payload,
            mode: 'signup',
        });
    },
    async authSignUp(context,payload) {
        const userType = payload.userType;
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC7sDufCs5on6nIJG3GGOPi9MZrtlVBp2E';
        let url2;
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true,
                displayName: `${payload.first} ' ' ${payload.last}`
            })
        });
        const responseData = await response.json();
        const userId = responseData.localId;
        if (userType === 'client') {
            url2 = `https://trainx-app-default-rtdb.europe-west1.firebasedatabase.app/clients/${userId}.json`;
        } else {
            url2 = `https://trainx-app-default-rtdb.europe-west1.firebasedatabase.app/trainers/${userId}.json`;
        }
        const responseAddToDatabase = await fetch(url2, {
            method: 'PUT',
            body: JSON.stringify({
                email: payload.email,
                userType: userType,
                userId: userId,
                firstName: payload.first,
                lastName: payload.last,
                description: payload.desc,
                rate: payload.rate,
            })
        });
        if (!response.ok || !responseAddToDatabase.ok) {
            const error = new Error(
                responseData.message || 'Failed to authenticate. Check your login data.' || responseAddToDatabase.message
            );
            throw error;
        }
    },
    async authLogin(context, payload) {
        let url =
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC7sDufCs5on6nIJG3GGOPi9MZrtlVBp2E';
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });
        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(
                responseData.message || 'Failed to Login. Check your login data.'
            );
            throw error;
        }
        const expiresIn = +responseData.expiresIn * 1000;
        // const expiresIn = 5000;
        const expirationDate = new Date().getTime() + expiresIn;

        localStorage.setItem('token', responseData.idToken);
        localStorage.setItem('userId', responseData.localId);
        localStorage.setItem('tokenExpiration', expirationDate);
        localStorage.setItem('userEmail', responseData.email);
        localStorage.setItem('userData', responseData.displayName)

        timer = setTimeout(function () {
            context.dispatch('autoLogout');
        }, expiresIn);
        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            email: responseData.email,
            userData: responseData.displayName
        });
    },
    tryLogin(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');
        const userEmail = localStorage.getItem('userEmail');
        const expiresIn = +tokenExpiration - new Date().getTime();
        const userData = localStorage.getItem('userData');

        if (expiresIn < 0) {
            return;
        }

        timer = setTimeout(function () {
            context.dispatch('autoLogout');
        }, expiresIn);

        if (token && userId) {
            context.commit('setUser', {
                token: token,
                userId: userId,
                email: userEmail,
                userData: userData
            });
        }
    },
    logout(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration');
        localStorage.removeItem('userEmail')
        localStorage.removeItem('userData')

        clearTimeout(timer);

        context.commit('setUser', {
            token: null,
            userId: null,
            email: null,
            userData: ''
        });
    },
    autoLogout(context) {
        context.dispatch('logout');
        context.commit('setAutoLogout');
    }
};
