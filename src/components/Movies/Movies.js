import React, { Component } from 'react'
import { getMovies } from '../../services/fakeMovieService';
import { getGenres } from '../../services/fakeGenreService';
import _ from 'lodash';

import './Movies.css';

import Pagination from '../Pagination/Pagination';
import ListGroup from '../ListGroup/ListGroup';

import { paginate } from '../../utils/paginate';
import MoviesTable from '../MoviesTable/MoviesTable';

export default class Movies extends Component {
    state = {
        movies: [],
        pageSize: 4,
        currentPage: 1,
        genres: [],
        filteredGenre: { name: "All Genres" },
        sortColumn: { path: 'title', order: 'asc' }
    }

    componentDidMount() {
        // Add All Genres category
        const genres = [{ name: "All Genres" }, ...getGenres()];
        this.setState({ movies: getMovies(), genres })
    }

    handleDeleteMovie = movie => {
        const movies = this.state.movies.filter(mov => mov._id !== movie._id);
        this.setState({ movies });
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

    handleFilterGenre = genre => {
        /*  when we select a genre we are looking 
            at the correspndng page that is displayed 
            which is not the case after filtering so 
            we need to set the page to be 1 */
        this.setState({ filteredGenre: genre, currentPage: 1 });
    }

    handleSortMovie = path => {
        let sortColumn = {...this.state.sortColumn};
        if (sortColumn.path === path)
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        else {
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        this.setState({ sortColumn });
    }

    getPagedData = () => {
        const { 
            pageSize, 
            currentPage, 
            movies: allMovies, 
            filteredGenre,
            sortColumn 
        } = this.state;
        
        // filter movies by genre
        const filteredMovies = filteredGenre && filteredGenre._id 
            ? allMovies.filter(allMovie => allMovie.genre._id === filteredGenre._id) 
            : allMovies;
        
        // sort movies by column name
        const sortedMovies = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order]);
        
        // paginate movies' pages
        const movies = paginate(sortedMovies, currentPage, pageSize);

        return {
            totalCount: filteredMovies.length,
            movies: movies
        }
    }

    displayMoviesNumber(moviesLength) {
        if (moviesLength === 0) 
            return 'There are no moviesLength on the database.';

        return `Showing ${moviesLength} movies in the database.`
    }

    handleCreateMovie = () => {
        const { history } = this.props;
        history.push("/movies/new");
    }

    render() {
        const { pageSize, currentPage, genres, filteredGenre, sortColumn } = this.state;
        
        const { totalCount, movies } = this.getPagedData();

        return (
            <div className="container">
				<div className="row">
					<div className="col-3">
                        <ListGroup 
                            genres={genres} 
                            filteredGenre={filteredGenre}
                            onFilterGenre={this.handleFilterGenre} />
					</div>
                    <div className="col-9">
                        <button 
                            className="btn btn-primary"
                            onClick={this.handleCreateMovie}>
                            New Movie
                        </button>
                        <p>{this.displayMoviesNumber(totalCount)}</p>
                        {
                            this.state.movies.length === 0 
                            ? null 
                            : <MoviesTable 
                                movies={movies} 
                                sortColumn={sortColumn}
                                onLikeMovie={this.handleLike}
                                onDeleteMovie={this.handleDeleteMovie}
                                onSortMovie={this.handleSortMovie} />
                        }
                        <Pagination 
                            itemsCount={totalCount} 
                            pageSize={pageSize} 
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange} />
                    </div>
                </div>
            </div>
        )
    }
}
