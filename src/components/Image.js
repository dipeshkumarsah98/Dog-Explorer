import React, { useState } from "react";

const Image = ({ img }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="col-lg-4  mb-lg-0 ">
      <div
        className="justify-content-center"
        style={{ display: isLoading ? "block" : "none" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <img
        src={img}
        alt="loading.."
        onLoad={() => setIsLoading(false)}
        className="w-100 shadow-1-strong rounded h-75 lg "
        style={{ display: isLoading ? "none" : "block" }}
      />
    </div>
  );
};

export default Image;
