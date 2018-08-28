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

    handleChange = e => {
        const account = {...this.state.account};
        account.username = e.currentTarget.value;
        this.setState({ account });
    }

    render() { 
        return ( 
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputUsername">
                            Username
                        </label>
                        <input
                            value={this.state.account.username}
                            onChange={this.handleChange}
                            type="text" 
                            className="form-control" 
                            id="exampleInputUsername" 
                            placeholder="Enter username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">
                            Password
                        </label>
                        <input 
                            type="password" 
                            className="form-control"
                            id="exampleInputPassword1" 
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