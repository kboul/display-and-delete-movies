import React from 'react'
import Form from './common/Form/Form';
import Joi from 'joi-browser';
import { getGenres } from '../services/genreService';
import { saveMovie, getMovie } from '../services/movieService';

class MovieForm extends Form {
    state = {
        data: {
            title: '',
            genreId: '',
            numberInStock: '',
            dailyRentalRate: ''
        },
        genres: [],
        errors: {}
    }

    async populateGenres() {
        // fetch the genres from the nodeAPI
        const { data: genres } = await getGenres();
        this.setState({ genres });
    }

    async populateMovie() {
        const { match, history } = this.props;

        // if url is new return
        if (history.location.pathname.includes("new")) return;

        // extract the movie id to get the specific movie
        const id = match.params.id;

        try {
            const { data: movie } = await getMovie(id);

            // if the url is not new populate the form with selected movie data
            this.setState({ data: this.mapToViewModel(movie) });
        }
        catch (ex) {
            // if movie is undefined navigate to not found page 
            if (ex.response && ex.response.status === 404)
                history.replace("/not-found");
        }
    }

    async componentDidMount() {
        await this.populateGenres();
        await this.populateMovie();
    }

    // model has to be redesigned 
    // to fit the nodeDB in case of edit mode
    mapToViewModel(movie) {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        }
    }

    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label("Title"),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().integer().min(0).max(100).label("Number In Stock"),
        dailyRentalRate: Joi.number().min(0).max(10).label("Rate")
    }

    doSubmit = async () => {
        // Call the server
        console.log("Movie Form Submitted");
        // save the movie using the nodeMovieService
        await saveMovie(this.state.data);
        this.props.history.replace('/movies');
    }

    render() {
        return (
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("title", "Title")}
                    {this.renderSelect("genreId", "Genre", this.state.genres)}
                    {this.renderInput("numberInStock", "Number In Stock")}
                    {this.renderInput("dailyRentalRate", "Daily Rental Rate")}
                    {this.renderButton("Save")}
                </form>
            </div>
        );
    }
}

export default MovieForm;