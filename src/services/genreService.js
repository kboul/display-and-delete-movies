import axios from 'axios';

export function getGenres () {
    return axios.get('/genres');
}