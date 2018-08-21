import React from 'react'
import './Like.css';

const Like = (props) => {
    let likeStyle = 'fa fa-heart';
    if (!props.like) likeStyle +=  '-o';

    return ( 
        <i 
            id="fa"
            className={likeStyle}
            aria-hidden="true"
            onClick={props.onClick}>
        </i>
    );
}

export default Like;