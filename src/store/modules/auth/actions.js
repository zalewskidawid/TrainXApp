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
                displayName: `${payload.first} ${payload.last}`
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
    async resetPassword(context, payload) {
        const email = payload.email;

        // Step 1: Send a password reset email
        const resetPasswordUrl = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC7sDufCs5on6nIJG3GGOPi9MZrtlVBp2E`;
        const resetPasswordBody = JSON.stringify({
            email: email,
            requestType: 'PASSWORD_RESET',
        });

        try {
            const resetPasswordResponse = await fetch(resetPasswordUrl, {
                method: 'POST',
                body: resetPasswordBody,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!resetPasswordResponse.ok) {
                const errorData = await resetPasswordResponse.json();
                if (errorData.error.message.includes('EMAIL_NOT_FOUND')) {
                    const error = new Error(errorData.error.message || 'Taki email nie istnieje');
                    throw error;
                } else {
                    const error = new Error(errorData.error.message || 'Wystąpił błąd przy wysyłaniu linku do resetowania hasła');
                    throw error;
                }
            }
        } catch (error) {
            throw ('Wystąpił błąd przy wysylaniu linku do resetowania hasła: ', error.message)
        }
    },
    async authLogin(context, payload) {
        let userType;
        let url =
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC7sDufCs5on6nIJG3GGOPi9MZrtlVBp2E';
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true,
                displayName: `${payload.first} ${payload.last}`
            })
        });
        const responseData = await response.json();
        const userId = responseData.localId;
        if (!response.ok) {
            const error = new Error(
                responseData.message || 'Nie udało się zalogować, sprawdź dane.'
            );
            throw error;
        }

        async function getUserType() {
            let response = await fetch(`https://trainx-app-default-rtdb.europe-west1.firebasedatabase.app/trainers/${userId}.json`);
            let responseData = await response.json();
            if(responseData === null) {
                response = await fetch(`https://trainx-app-default-rtdb.europe-west1.firebasedatabase.app/clients/${userId}.json`);
                responseData = await response.json();
            }
            if (!response.ok) {
                const error = new Error(responseData.message || 'Failed to fetch!');
                throw error;
            }
            userType = responseData.userType;
        }
        await getUserType();
        console.log(responseData)

        const expiresIn = +responseData.expiresIn * 1000;
        // const expiresIn = 5000;
        const expirationDate = new Date().getTime() + expiresIn;

        localStorage.setItem('token', responseData.idToken);
        localStorage.setItem('userId', responseData.localId);
        localStorage.setItem('tokenExpiration', expirationDate);
        localStorage.setItem('userEmail', responseData.email);
        localStorage.setItem('userData', responseData.displayName)
        localStorage.setItem('userType', userType);

        timer = setTimeout(function () {
            context.dispatch('autoLogout');
        }, expiresIn);

        context.commit('setUser', {
            token: responseData.idToken,
            userId: userId,
            email: responseData.email,
            userData: responseData.displayName,
            userType: userType
        });
        context.dispatch('requests/fetchRequests')
    },
    tryLogin(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');
        const userEmail = localStorage.getItem('userEmail');
        const userType = localStorage.getItem('userType')
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
                userData: userData,
                userType: userType
            });
        }
        context.dispatch('requests/fetchRequests')
    },
     logout(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration');
        localStorage.removeItem('userEmail')
        localStorage.removeItem('userData')
         localStorage.removeItem('userType')

        clearTimeout(timer);

        context.commit('setUser', {
            token: null,
            userId: null,
            email: null,
            userData: '',
            userType: ''
        });
         context.commit('profile/setUpdate', true);
    },
    autoLogout(context) {
        context.dispatch('logout');
        context.commit('setAutoLogout');
    }
};
