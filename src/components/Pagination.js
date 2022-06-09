import React from 'react'

export default function Pagination({ itemCount: totalItem, pageChange, currentPage, pageSize }) {
    const pageCount = Math.ceil(totalItem / pageSize || 10);
    const pages = [];

    if (pageCount === 1) return null;

    //This will create array of range pageCount
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                {pages.map(page => (
                    <li
                        className={currentPage === page ? "page-item active" : "page-item"}
                        key={page}
                    >
                        <button className="page-link"
                            onClick={() => pageChange(page)}>
                            {page}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>

    )
}
