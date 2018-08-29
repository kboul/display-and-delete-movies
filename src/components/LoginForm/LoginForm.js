import React from 'react';
import Input from '../common/Input/Input';
import Form from '../common/Form/Form';
import Joi from 'joi-browser';

class LoginForm extends Form {
    state = {
        data: {
            username: '',
            password: ''
        },
        errors: {}
    }

    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password")
    }

    doSubmit = () => {
        // Call the server
        console.log("Submitted");
    }

    validateProperty = ({name, value}) => {
       const obj = { [name]: value };
       const schema = { [name]: this.schema[name] };
       const { error } = Joi.validate(obj, schema);
       return error ? error.details[0].message : null;
    }

    render() { 
        const { data, errors } = this.state;
        return ( 
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <Input 
                        name="username" 
                        label="Username"
                        value={data.username}
                        error={errors.username}
                        onChange={this.handleChange} />
                    <Input 
                        name="password" 
                        label="Password"
                        value={data.password}
                        error={errors.password}
                        onChange={this.handleChange} />
                    <button 
                        disabled={this.validate()}
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