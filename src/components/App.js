import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Movies from './Movies';
import Navbar from './Navbar/Navbar';
import Customers from './Customers'
import Rentals from './Rentals'
import NotFound from './NotFound';
import MovieForm from './MovieForm';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Logout from './Logout';
import ProtectedRoute from './common/ProtectedRoute/ProtectedRoute';
import Profile from './Profile';
import authService from '../services/authService';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
    state = {
        routes: [
            { path: '/movies', name: "Movies" },
            { path: '/customers', name: "Customers" },
            { path: '/rentals', name: "Rentals" }
        ]
    }

    componentDidMount = () => {
        const user = authService.getCurrentUser();
        this.setState({ user });
    }

    render() {
        const { routes, user } = this.state;
        return (
            <div>
                <ToastContainer />
                <Navbar
                    routes={routes}
                    user={user} />
                <main role="main" className="container">
                    <Switch>
                        <Route path="/register" component={RegisterForm} />
                        <Route path="/login" component={LoginForm} />
                        <Route path="/logout" component={Logout} />
                        <ProtectedRoute path="/movies/:id" component={MovieForm} />
                        <ProtectedRoute path="/profile" component={Profile} />
                        <Route
                            path="/movies"
                            render={props => <Movies {...props} user={user} />}>
                        </Route>
                        <Route path="/customers" component={Customers} />
                        <Route path="/rentals" component={Rentals} />
                        <Route path="/not-found" component={NotFound} />
                        <Redirect from="/" exact to="/movies" />
                        <Redirect to="/not-found" />
                    </Switch>
                </main>
            </div>
        )
    }
}

export default App;
