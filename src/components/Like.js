import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Like.css';

const Like = ({ like, onClick }) => {
    let likeStyle = 'fa fa-heart';
    if (!like) likeStyle += '-o';

    return (
        <i
            id="fa"
            className={likeStyle}
            aria-hidden="true"
            onClick={onClick}></i>
    );
};

Like.propTypes = {
    like: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};

export default Like;
