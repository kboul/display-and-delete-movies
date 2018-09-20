import http from '../services/httpService';
import config from '../config.json';
import jwtDecode from 'jwt-decode';

const apiEndpoint = `${config.apiEndpoint}/auth`;
const tokenKey = 'token';

export async function login(username, password) {
    const { data: jwt } = await http.post(apiEndpoint, {
        email: username,
        password: password
    });
    localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    const jwt = localStorage.getItem(tokenKey);

    // if jwt is null stop => anonymous user
    if (!jwt) return null;

    return jwtDecode(jwt);	
}

export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export default {
    getJwt,
    login,
    loginWithJwt,
    logout,
    getCurrentUser
}