import React, { Component } from 'react';

class LoginForm extends Component {
    render() { 
        return ( 
            <div>
                <h1>Login</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                            Email address
                        </label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            placeholder="Enter email" />
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