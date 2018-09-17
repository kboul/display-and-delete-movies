import React from 'react';

const Search = ({ value, onSearchMovie }) => {
    return (
        <div>
            <input 
                type="text" 
                value={value}
                className="form-control" 
                placeholder="Search..." 
                onChange={onSearchMovie}/>
            <br/>
        </div>
    );
}
 
export default Search;