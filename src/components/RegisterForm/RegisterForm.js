import React from 'react'
import Form from '../common/Form/Form';
import Joi from 'joi-browser';
import userService from '../../services/userService';
import authService from '../../services/authService';

class RegisterForm extends Form {
    state = {
        data: {
            username: '',
            password: '',
            name: ''
        },
        errors: {}
    }

    schema = {
        username: Joi.string().email({ minDomainAtoms: 2 }).required().label("Username"),
        password: Joi.string().min(5).required().label("Password"),
        name: Joi.string().required().label("Name")
    }

    doSubmit = async () => {
        try {
            const response = await userService.register(this.state.data);
            authService.loginWithJwt(response.headers['x-auth-token']);
            window.location= '/';
        } catch(ex) {
            if (ex.response && ex.response.status === 400) {
                // if user has already registered & tries to register again
                // pass the DB output error message to username
                const errors = {...this.state.errors};
                errors.username = ex.response.data;
                this.setState({ errors });
            }
        }
    }

    render() { 
        return ( 
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password")}
                    {this.renderInput("name", "Name")}
                    {this.renderButton("Register")}
                </form>
            </div>
        );
    }
}
 
export default RegisterForm;