import React from 'react'
import _ from 'lodash'; // optimized underscore library
import PropTypes from 'prop-types';

const anchorStyle = { cursor: 'pointer', boxShadow: 'none' }

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
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
                            className={(page !== currentPage) ? "page-item" : "page-item active"}>
                            <a
                                className="page-link"
                                style={anchorStyle}
                                href="/#"
                                onClick={(event) => { onPageChange(page); event.preventDefault(); }}>
                                {page}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default Pagination;