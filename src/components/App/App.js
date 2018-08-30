import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Movies from '../Movies/Movies';
import Navbar from '../Navbar/Navbar';
import Customers from '../Customers/Customers'
import Rentals from '../Rentals/Rentals'
import NotFound from '../NotFound/NotFound';
import MovieForm from '../MovieForm/MovieForm';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';

import './App.css';

class App extends Component {
	state = {
		routes: [
			{ path: '/movies', name: "Movies" },
			{ path: '/customers', name: "Customers" },
			{ path: '/rentals', name: "Rentals" },
			{ path: '/login', name: "Login" },
			{ path: '/register', name: 'Register'}
		]
	}
	render() {
		return (
			<div>
				<Navbar routes={this.state.routes} />
					<main role="main" className="container">
						<Switch>
							<Route path="/register" component={RegisterForm} /> 
							<Route path="/login" component={LoginForm} /> 
							<Route path="/movies/new" component={MovieForm} />    
							<Route path="/movies/:id" component={MovieForm} />      
							<Route path="/movies" component={Movies}></Route>
							<Route path="/customers" component={Customers}></Route>
							<Route path="/rentals" component={Rentals}></Route>
							<Route path="/not-found" component={NotFound}></Route>
							<Redirect from="/" exact to="/movies" />
							<Redirect to="/not-found" />
						</Switch>
					</main>
				</div>
		)
	}
}

export default App;
