import axios from 'axios';
import { toast } from 'react-toastify';
import authService from './authService';

/*
	configuring default headers 
	by includingthem in each request
	node: "requiresAuth": true
*/
axios.defaults.headers.common['x-auth-token'] = authService.getJwt();

axios.interceptors.response.use(null, error => {
	const expectedError = 
		error.response && 
		error.response.status >= 400 && 
		error.response.status < 500;
	if (!expectedError) {
		console.log('Logging the error ', error);
		toast.error('An unexpected error occured');
	}
	return Promise.reject(error);
})

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}
