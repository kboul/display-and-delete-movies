import React, { Component } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';
import Pagination from './Pagination';
import ListGroup from './ListGroup';
import MoviesTable from './MoviesTable';
import Search from './Search';
import { getMovies, deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import { paginate } from '../utils/paginate';
import '../styles/Movies.css';

export default class Movies extends Component {
    state = {
        movies: [],
        pageSize: 4,
        currentPage: 1,
        genres: [],
        filteredGenre: { name: 'All Genres' },
        sortColumn: { path: 'title', order: 'asc' },
        searchQuery: ''
    };

    async componentDidMount() {
        // Add All Genres category
        const { data: allGenres } = await getGenres();
        const genres = [{ name: 'All Genres' }, ...allGenres];
        const { data: movies } = await getMovies();
        this.setState({ movies, genres });
    }

    handleDeleteMovie = async movie => {
        const originalMovies = this.state.movies;
        const movies = originalMovies.filter(mov => mov._id !== movie._id);
        this.setState({ movies });
        // delete movie from the mongoDB
        try {
            await deleteMovie(movie._id);
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                toast.error('This movie has already been deleted');
            // undo the movies at any error response type
            this.setState({ movies: originalMovies });
        }
    };

    handleLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].like = !movies[index].like;
        this.setState({ movies });
    };

    handlePageChange = page => {
        this.setState({ currentPage: page });
    };

    handleFilterGenre = genre => {
        /*  when we select a genre we are looking 
            at the corresponding page that is displayed 
            which is not the case after filtering so 
            we need to set the page to be 1 */
        this.setState({
            filteredGenre: genre,
            currentPage: 1,
            searchQuery: '' // clear the search query on category click
        });
    };

    handleSortMovie = path => {
        let sortColumn = { ...this.state.sortColumn };
        if (sortColumn.path === path)
            sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
        else {
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        this.setState({ sortColumn });
    };

    handleSearchMovie = ({ currentTarget: input }) => {
        // convert the search input to lowercase & store it
        const searchQuery = input.value.toLowerCase();
        this.setState({ searchQuery, currentPage: 1 });
    };

    getPagedData = () => {
        const {
            pageSize,
            currentPage,
            movies: allMovies,
            filteredGenre,
            sortColumn
        } = this.state;

        // filter movies by genre
        let filteredMovies =
            filteredGenre && filteredGenre._id
                ? allMovies.filter(
                      allMovie => allMovie.genre._id === filteredGenre._id
                  )
                : allMovies;

        // if search input is not empty filter the movies based on input
        if (this.state.searchQuery.length > 0)
            filteredMovies = allMovies.filter(movie =>
                movie.title.toLowerCase().includes(this.state.searchQuery)
            );

        // sort movies by column name
        const sortedMovies = _.orderBy(
            filteredMovies,
            [sortColumn.path],
            [sortColumn.order]
        );

        // paginate movies' pages
        let movies = paginate(sortedMovies, currentPage, pageSize);

        return {
            totalCount: filteredMovies.length,
            movies: movies
        };
    };

    displayMoviesNumber(moviesLength) {
        if (moviesLength === 0) return 'There are no movies on the database.';

        return `Showing ${moviesLength} movies in the database.`;
    }

    handleCreateMovie = () => {
        const { history } = this.props;
        history.push('/movies/new');
    };

    render() {
        const {
            pageSize,
            currentPage,
            genres,
            filteredGenre,
            sortColumn,
            searchQuery
        } = this.state;

        const { user } = this.props;

        const { totalCount, movies } = this.getPagedData();

        return (
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <ListGroup
                            searchQuery={searchQuery}
                            genres={genres}
                            filteredGenre={filteredGenre}
                            onFilterGenre={this.handleFilterGenre}
                        />
                    </div>
                    <div className="col-9">
                        {user && (
                            <button
                                className="btn btn-primary mb-3"
                                onClick={this.handleCreateMovie}>
                                New Movie
                            </button>
                        )}
                        <p>{this.displayMoviesNumber(totalCount)}</p>
                        <Search
                            value={searchQuery}
                            onSearchMovie={this.handleSearchMovie}
                        />
                        {this.state.movies.length !== 0 && (
                            <MoviesTable
                                movies={movies}
                                sortColumn={sortColumn}
                                onLikeMovie={this.handleLike}
                                onDeleteMovie={this.handleDeleteMovie}
                                onSortMovie={this.handleSortMovie}
                            />
                        )}
                        <Pagination
                            itemsCount={totalCount}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
