import React from "react";

export default function Search({ handelChange }) {
  return (
    <input
      type="search"
      className="form-control my-3 fs-4"
      placeholder="Search here.."
      onChange={handelChange}
    />
  );
}
