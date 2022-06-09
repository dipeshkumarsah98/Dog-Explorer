import React from 'react'

export default function Search({ handelChange }) {

    return (
        <input
            type="search"
            className="form-control m-3"
            placeholder="Search here.."
            onChange={handelChange}
        />
    )
}
