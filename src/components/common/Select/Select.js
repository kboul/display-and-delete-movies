import React from 'react';

const Select = ({ name, label, value, options, error, onChange }) => {
    return ( 
        <div className="form-group">
            <label htmlFor={name}>
                {label}
            </label>
            <select
                className="form-control" 
                id={name} 
                name={name}
                label={label}
                value={value}
                onChange={onChange}>
                <option value="" />
                {options.map(opt => {
                    return (
                        <option 
                            key={opt._id} 
                            value={opt._id}>
                            {opt.name}
                        </option>
                    )
                })}
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}
 
export default Select;