import React, { Component } from 'react';
import Input from '../common/Input/Input';
import Joi from 'joi-browser';

class LoginForm extends Component {
    state = {
        account: {
            username: '',
            password: ''
        },
        errors: {}
    }

    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password")
    }

    validate = () => {
        const result = Joi.validate(this.state.account, this.schema, { 
            abortEarly: false 
        });

        if (!result.error) return null;

        const errors = {};
        for (let item of result.error.details)
            errors[item.path[0]] = item.message;
        return errors;
       
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