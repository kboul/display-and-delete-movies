import React from 'react';
import '../styles/ListGroup.css';

const ListGroup = ({
    genres,
    valueProperty,
    textProperty,
    onFilterGenre,
    filteredGenre,
    searchQuery
}) => {
    return (
        <ul className="list-group">
            {genres.map(genre => {
                return (
                    <li
                        key={
                            genre[valueProperty] ? genre[valueProperty] : 'all'
                        }
                        className={
                            filteredGenre.name === genre[textProperty] &&
                            searchQuery.length === 0
                                ? 'list-group-item active'
                                : 'list-group-item'
                        }
                        onClick={() => {
                            onFilterGenre(genre);
                        }}>
                        {genre[textProperty]}
                    </li>
                );
            })}
        </ul>
    );
};

ListGroup.defaultProps = {
    valueProperty: '_id',
    textProperty: 'name'
};

export default ListGroup;
