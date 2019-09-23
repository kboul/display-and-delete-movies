import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ routes, user }) => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/movies">Video App</Link>
                <button
                    className="navbar-toggler"
                    type="button" data-toggle="collapse"
                    data-target="#navbarCollapse"
                    aria-controls="navbarCollapse"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto mt-1">
                        {routes.map(route => {
                            return (
                                <li
                                    className="nav-item"
                                    key={route.name}>
                                    <NavLink
                                        className="nav-link"
                                        to={route.path}>
                                        {route.name}
                                    </NavLink>
                                </li>
                            )
                        })}
                        {!user ?
                            <>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to='/login'>
                                        Login
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to='/register'>
                                        Register
                                    </NavLink>
                                </li>
                            </>
                            :
                            <>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to='/profile'>
                                        {user.name}
                                    </NavLink>

                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to='/logout'>
                                        Logout
                                    </NavLink>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </nav>
        </header>
    );
}

Navbar.propTypes = {
    routes: PropTypes.array.isRequired,
    user: PropTypes.object
}

export default Navbar;