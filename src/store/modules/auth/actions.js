let timer;
export default {
    async login(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'login'
        });
    },
    async signup(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'signup',
        });
    },
    async auth(context, payload) {
        const mode = payload.mode;
        const userType = payload.userType;
        let url2 = '';
        let url =
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC7sDufCs5on6nIJG3GGOPi9MZrtlVBp2E';
        if (mode === 'signup') {
            url =
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC7sDufCs5on6nIJG3GGOPi9MZrtlVBp2E';
        }
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });
        const responseData = await response.json();
        if (mode === 'signup') {
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
        }

        const expiresIn = +responseData.expiresIn * 1000;
        // const expiresIn = 5000;
        const expirationDate = new Date().getTime() + expiresIn;

        localStorage.setItem('token', responseData.idToken);
        localStorage.setItem('userId', responseData.localId);
        localStorage.setItem('tokenExpiration', expirationDate);

        timer = setTimeout(function () {
            context.dispatch('autoLogout');
        }, expiresIn);

        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId
        });
    },
    tryLogin(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        const expiresIn = +tokenExpiration - new Date().getTime();

        if (expiresIn < 0) {
            return;
        }

        timer = setTimeout(function () {
            context.dispatch('autoLogout');
        }, expiresIn);

        if (token && userId) {
            context.commit('setUser', {
                token: token,
                userId: userId
            });
        }
    },
    logout(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration');

        clearTimeout(timer);

        context.commit('setUser', {
            token: null,
            userId: null
        });
    },
    autoLogout(context) {
        context.dispatch('logout');
        context.commit('setAutoLogout');
    }
};
