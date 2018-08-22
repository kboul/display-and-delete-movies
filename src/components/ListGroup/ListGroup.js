import React from 'react';

const ListGroup = props => {
    const { genres, valueProperty, textProperty } = props;

    return (  
        <ul className="list-group">
            {genres.map(g => {
                return (
                    <li 
                        key={g[valueProperty]}
                        className="list-group-item">
                        {g[textProperty]}
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