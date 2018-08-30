import React from 'react'
import Form from '../common/Form/Form';
import Joi from 'joi-browser';
import { getGenres } from '../../services/fakeGenreService';
import { saveMovie, getMovie } from '../../services/fakeMovieService';

class MovieForm extends Form {
    state = {
        data: {
            title: '',
            genre: '',
            numberInStock: '',
            dailyRentalRate: ''
        },
        genres: [],
        errors: {}
    }

    componentDidMount() {
        const genres = getGenres();
        this.setState({ genres });

        const { match, history } = this.props;

        if (history.location.pathname.includes("new")) return;
        const id = match.params.id;
        const movie = getMovie(id);
        this.setState({ data: this.mapToViewModel(movie) });
    }

    mapToViewModel(movie) {
        return {
            _id: movie._id,
            title: movie.title,
            genre: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        }
    }

    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label("Title"),
        genre: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().integer().min(0).max(100).label("Number In Stock"),
        dailyRentalRate: Joi.number().min(0).max(10).label("Rate")
    }

    doSubmit = () => {
        // Call the server
        console.log("Movie Form Submitted");
        // save the movie using the fakeMovieService
        saveMovie(this.state.data);
        this.props.history.replace('/movies');
    }

    render() { 
        return ( 
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("title", "Title")}
                    {this.renderSelect("genre", "Genre", this.state.genres)}
                    {this.renderInput("numberInStock", "Number In Stock")}
                    {this.renderInput("dailyRentalRate", "Daily Rental Rate")}
                    {this.renderButton("Save")}
                </form>
            </div>
        );
    }
}
 
export default MovieForm;