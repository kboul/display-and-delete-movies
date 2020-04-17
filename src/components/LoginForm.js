import React from 'react';
import Joi from 'joi-browser';
import { Redirect } from 'react-router-dom';
import Form from './common/Form';
import { login, getCurrentUser } from '../services/authService';

export default class LoginForm extends Form {
    state = {
        data: {
            username: '',
            password: '',
        },
        errors: {},
    };

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password'),
    };

    doSubmit = async () => {
        try {
            const { data } = this.state;
            await login(data.username, data.password);

            const { state } = this.props.location;
            window.location = state ? state.from.pathname : '/';
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.username = ex.response.data;
                this.setState({ errors });
            }
        }
        console.log(this.state.errors);
    };

    render() {
        if (getCurrentUser()) return <Redirect to="/" />;

        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('username', 'Username')}
                    {this.renderInput('password', 'Password')}
                    {this.renderButton('Login')}
                </form>
            </div>
        );
    }
}
