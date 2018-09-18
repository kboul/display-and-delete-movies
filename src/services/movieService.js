import axios from 'axios';
import config from '../config.json';

const apiEndpoint = `${config.apiEndpoint}/movies`;

export function getMovies () {
    return axios.get(apiEndpoint);
}

export function deleteMovie(id) {
    return axios.delete(`${apiEndpoint}/${id}`);
}