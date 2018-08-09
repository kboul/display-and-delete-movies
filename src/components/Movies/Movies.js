import React, { Component } from 'react'
import { getMovies } from '../../services/fakeMovieService';

export default class Movies extends Component {
    state = {
        movies: getMovies()
    }

    handleDeleteMovie = movie => {
        const movies = this.state.movies.filter(mov => mov._id !== movie._id);
        this.setState({ movies });
    }

    renderTableHeader() {
        if (this.state.movies.length === 0) return null;

        return (
            <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Range</th>
                    <th></th>
                </tr>
            </thead>
        )
    }

    renderMovies = () => {
        return (
            <div>
                <p>{this.displayMoviesNumber()}</p>
                <table className="table">
                    {this.renderTableHeader()}
                    {this.state.movies.map(movie => {
                        return (
                            <tbody key={movie._id}>
                                <tr >
                                    <td>{movie.title}</td>        
                                    <td>{movie.genre.name}</td>   
                                    <td>{movie.numberInStock}</td> 
                                    <td>{movie.dailyRentalRate}</td>
                                    <td>
                                        <button 
                                            className="btn btn-danger"
                                            onClick={() => this.handleDeleteMovie(movie)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr> 
                            </tbody>
                        )
                    })}
                </table>
            </div>
        )
    }

    displayMoviesNumber() {
        if (this.state.movies.length === 0) 
            return 'There are no movies on the database.';

        return `Showing ${this.state.movies.length} movies in the database.`
    }

    render() {
        return (
            <div>
                {this.renderMovies()}
            </div>
        )
    }
}
