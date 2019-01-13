import { Auth } from 'aws-amplify';

export default class AWSAuth {
    callbacks = [];

    setNavigationHistory() {
    }

    subscribe(callback) {
        this.callbacks.push(callback);
    }

    unsubscribe(callback) {
        debugger;
    }

    isAuthenticated() {
        return Auth.isAuthenticated;
    }

    signUp(data) {
        return Auth.signUp({
            'username': data.email,
            'password': data.password,
            'attributes': {
                'email': data.email
            }
        });
    }

    login(data) {
        return Auth.signIn(data.email, data.password);
    }

    verify(data) {
        return Auth.confirmSignUp(data.email, data.code);
    }
}
