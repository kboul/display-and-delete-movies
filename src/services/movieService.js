import axios from 'axios';
import config from '../config.json';

const apiEndpoint = `${config.apiEndpoint}/movies`;

export function getMovies() {
    return axios.get(apiEndpoint);
}

export function getMovie(id) {
    return axios.get(`${apiEndpoint}/${id}`);
}

export function saveMovie(movie) {
    if (movie._id) {
        const body = {...movie};
        delete body._id;
        return axios.put(`${apiEndpoint}/${movie._id}`, body);
    }

    return axios.post(apiEndpoint, movie);
}

export function deleteMovie(id) {
    return axios.delete(`${apiEndpoint}/${id}`);
}