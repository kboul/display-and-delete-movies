import React from 'react'
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';

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
                    <ul className="navbar-nav mr-auto">
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
                            <React.Fragment>
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
                            </React.Fragment>
                            : 
                            <React.Fragment>
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
                            </React.Fragment>
                        }
                    </ul>
                </div>
            </nav>
        </header>
    );
}
 
export default Navbar;