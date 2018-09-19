import http from '../services/httpService';
import config from '../config.json';

const apiEndpoint = `${config.apiEndpoint}/users`;

export function register(user) {
    return http.post(apiEndpoint, {
        email: user.username,
        password: user.password,
        name: user.name
    });
}