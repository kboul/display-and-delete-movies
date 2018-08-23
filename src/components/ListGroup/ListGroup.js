import React from 'react';
import './ListGroup.css';

const ListGroup = props => {
    const { 
        genres, 
        valueProperty, 
        textProperty, 
        onFilterGenre, 
        filteredGenre } = props;

    return (  
        <ul className="list-group">
            {genres.map(genre => {
                return (
                    <li 
                        key={genre[valueProperty] ? genre[valueProperty] : 'all'}
                        className={
                            filteredGenre.name === genre[textProperty] ? 'list-group-item active' : 'list-group-item'
                        }
                        onClick={() => { onFilterGenre(genre) } }>
                        {genre[textProperty]}
                    </li>
                )
            })}
        </ul>
    );
}

ListGroup.defaultProps = {
    valueProperty: '_id',
    textProperty: 'name'
}
 
export default ListGroup;