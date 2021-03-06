import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Like from './Like';
import { getCurrentUser } from '../services/authService';
import '../styles/MoviesTable.css';

class MoviesTable extends Component {
    columns = [
        { path: 'title', label: 'Title' },
        { path: 'genre.name', label: 'Genre' },
        { path: 'numberInStock', label: 'Stock' },
        { path: 'dailyRentalRate', label: 'Range' }
    ];

    renderSortIcon = column => {
        const { sortColumn } = this.props;
        if (column.path !== sortColumn.path) return null;
        if (sortColumn.order === 'asc') return <i className="fa fa-sort-asc" />;
        return <i className="fa fa-sort-desc" />;
    };

    render() {
        const { movies, onLikeMovie, onDeleteMovie, onSortMovie } = this.props;

        return (
            <table className="table">
                <thead>
                    <tr>
                        {this.columns.map(column => {
                            return (
                                <th
                                    key={column.path}
                                    onClick={() => {
                                        onSortMovie(column.path);
                                    }}
                                    scope="col">
                                    {column.label} {this.renderSortIcon(column)}
                                </th>
                            );
                        })}
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                {movies.map(movie => {
                    return (
                        <tbody key={movie._id}>
                            <tr>
                                <td>
                                    <Link to={`/movies/${movie._id}`}>
                                        {movie.title}
                                    </Link>
                                </td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td>
                                    <Like
                                        like={movie.like}
                                        onClick={() => {
                                            onLikeMovie(movie);
                                        }}
                                    />
                                </td>
                                <td>
                                    {getCurrentUser() && (
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                onDeleteMovie(movie)
                                            }>
                                            Delete
                                        </button>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    );
                })}
            </table>
        );
    }
}

export default MoviesTable;
