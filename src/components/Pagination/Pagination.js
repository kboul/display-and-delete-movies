import React from 'react'
import _ from 'lodash'; // optimized underscore library

export default (props) => {
    const { itemsCount, pageSize } = props;

    // calculate required pagination numbers
    const pagesCount = Math.ceil(itemsCount / pageSize);
    // if pagesCount equals 1 do nto show pagination
    if (pagesCount) return null;    
    // create an array of required pagination numbers using lodash
    const pages = _.range(1, pagesCount + 1);

    return (
       <nav>
            <ul className="pagination justify-content-center">
                {pages.map(page => {
                    return (
                        <li key={page} className="page-item">
                            <a className="page-link">{page}</a> 
                        </li>
                    )
                })}
            </ul>
       </nav>
    )
}
