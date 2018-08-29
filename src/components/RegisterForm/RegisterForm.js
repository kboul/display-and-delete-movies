import React from 'react'
import Form from '../common/Form/Form';
import Input from '../common/Input/Input';
import Joi from 'joi-browser';

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

    doSubmit = () => {
        // Call the server
        console.log("Submitted");
    }

    render() { 
        const { data, errors } = this.state;
        return ( 
            <div>
                <h1>Register</h1>
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
                    <Input 
                        name="name" 
                        label="Name"
                        value={data.name}
                        error={errors.name}
                        onChange={this.handleChange} />
                    {this.renderButton("Register")}
                </form>
            </div>
        );
    }
}
 
export default RegisterForm;