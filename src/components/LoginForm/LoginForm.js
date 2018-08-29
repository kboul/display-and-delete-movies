import React, { Component } from 'react';
import Input from '../common/Input/Input';

class LoginForm extends Component {
    state = {
        account: {
            username: '',
            password: ''
        },
        errors: {}
    }

    validate = () => {
        const errors = {};

        const { account } = this.state;
        if (account.username.trim() === '')
            errors.username = 'Username is required';
        if (account.password.trim() === '')
            errors.password = 'Password is required';

        // if the keys array of errors object is 0 => no errors
        return Object.keys(errors).length === 0 ? null : errors;
    }

    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate();
        // errors should not be null
        this.setState({ errors: errors || {} });
        if (errors) return ;

        // Call th eserver
        console.log("Submitted");
    }

    validateProperty = ({name, value }) => {
        if (name === 'username') {
            if (value.trim() === '') return 'Username is required';
        }
        if (name === 'password') {
            if (value.trim() === '') return 'Password is required';
        }
    }

    // instead of e.currentTarget
    handleChange = ({ currentTarget: input }) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const account = {...this.state.account};
        account[input.name] = input.value;
        this.setState({ account, errors });
    }

    render() { 
        const { account, errors } = this.state;
        return ( 
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <Input 
                        name="username" 
                        label="Username"
                        value={account.username}
                        error={errors.username}
                        onChange={this.handleChange} />
                    <Input 
                        name="password" 
                        label="Password"
                        value={account.password}
                        error={errors.password}
                        onChange={this.handleChange} />
                    <button 
                        type="submit"
                        className="btn btn-primary">
                        Login
                    </button>
                </form>
            </div>
        );
    }
}
 
export default LoginForm;