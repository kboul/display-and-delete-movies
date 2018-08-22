import React, { Component } from 'react'
import { getMovies } from '../../services/fakeMovieService';
import { getGenres } from '../../services/fakeGenreService';

import './Movies.css';

import Like from '../Like/Like';
import Pagination from '../Pagination/Pagination';
import ListGroup from '../ListGroup/ListGroup';

import { paginate } from '../../utils/paginate';

export default class Movies extends Component {
    state = {
        movies: [],
        pageSize: 4,
        currentPage: 1,
        genres: []
    }

    componentDidMount() {
        this.setState({
            movies: getMovies(),
            genres: getGenres()
        })
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
                    <th></th>
                </tr>
            </thead>
        )
    }

    handleLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].like = !movies[index].like;
        this.setState({ movies });
    }

    handlePageChange = page => {
        this.setState({ currentPage: page });
    }

    renderMovies = () => {
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, movies: allMovies, genres } = this.state;

        const movies = paginate(allMovies, currentPage, pageSize);

        return (
            <div className="container">
				<div className="row">
					<div className="col-3">
                        <ListGroup genres={genres} />
					</div>
                    <div className="col-9">
                        <p>{this.displayMoviesNumber()}</p>
                        <table className="table">
                            {this.renderTableHeader()}
                            {movies.map(movie => {
                                return (
                                    <tbody key={movie._id}>
                                        <tr>
                                            <td>{movie.title}</td>        
                                            <td>{movie.genre.name}</td>   
                                            <td>{movie.numberInStock}</td> 
                                            <td>{movie.dailyRentalRate}</td>
                                            <td>
                                                <Like 
                                                    like={movie.like} 
                                                    onClick={() => { this.handleLike(movie) } }/>
                                            </td>
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
                        <Pagination 
                            itemsCount={count} 
                            pageSize={pageSize} 
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange} />
                    </div>
                </div>
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
