import http from '../services/httpService';

const apiEndpoint = '/users';

export default function register(user) {
    return http.post(apiEndpoint, {
        email: user.username,
        password: user.password,
        name: user.name
    });
}