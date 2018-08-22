import React from 'react'
import _ from 'lodash'; // optimized underscore library

export default (props) => {
    const { itemsCount, pageSize, currentPage,  onPageChange } = props;

    // calculate required pagination numbers
    const pagesCount = Math.ceil(itemsCount / pageSize);
    // if pagesCount equals 1 don't show pagination
    if (pagesCount === 1) return null;    
    // create an array of required pagination numbers using lodash
    const pages = _.range(1, pagesCount + 1);

    return (
        <nav>
            <ul className="pagination justify-content-center">
                {pages.map(page => {
                    return (
                        <li 
                            key={page} 
                            className={ (page !== currentPage) ? "page-item" : "page-item active"}>
                            <a 
                                className="page-link" 
                                onClick={() => { onPageChange(page)} }>
                                {page}
                            </a> 
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
