import React, { Component } from 'react';

class LoginForm extends Component {
    username = React.createRef();

    componentDidMount() {
        this.username.current.focus();
    }

    handleSubmit = e => {
        e.preventDefault();

        // call the server
        const username = this.username.current.value
        console.log("Submitted", username);
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
                            ref={this.username} 
                            type="username" 
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