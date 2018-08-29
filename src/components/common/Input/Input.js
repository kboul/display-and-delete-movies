import React from 'react';

const Input = ({ name, label, value, error, onChange }) => {
    return ( 
        <div className="form-group">
            <label htmlFor={name}>
                {label}
            </label>
            <input
                value={value}
                onChange={onChange}
                type="text" 
                className="form-control" 
                id={name} 
                name={name}
                placeholder="Enter username" />
                {error && <div className="alert alert-danger">
                    {error}
                </div>}
        </div>
    );
}
 
export default Input;