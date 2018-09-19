import http from '../services/httpService';
import config from '../config.json';

const apiEndpoint = `${config.apiEndpoint}/auth`;

export function login(username, password) {
    return http.post(apiEndpoint, {
        email: username,
        password: password
    });
}