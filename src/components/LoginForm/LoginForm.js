import React, { Component } from 'react';

class LoginForm extends Component {
    state = {
        account: {
            username: '',
            password: ''
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log("Submitted");
    }

    // instead of e.currentTarget
    handleChange = ({ currentTarget: input }) => {
        const account = {...this.state.account};
        account[input.name] = input.value;
        this.setState({ account });
    }

    render() { 
        const { account } = this.state;
        return ( 
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputUsername">
                            Username
                        </label>
                        <input
                            value={account.username}
                            onChange={this.handleChange}
                            type="text" 
                            className="form-control" 
                            id="username" 
                            name="username"
                            placeholder="Enter username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">
                            Password
                        </label>
                        <input 
                            value={account.password}
                            onChange={this.handleChange}
                            type="password" 
                            className="form-control"
                            id="password" 
                            name="password"
                            placeholder="Password" />
                    </div>
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