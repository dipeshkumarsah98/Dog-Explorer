import React, { useState } from "react";

const Image = ({ img }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className=" col-md-6 col-lg-4 mb-4 mb-lg-0 d-flex  justify-content-center align-items-center">
      <div
        className="justify-content-center align-items-center mb-lg-3 bg-light"
        style={{
          display: isLoading ? "flex" : "none",
          height: "450px",
          width: "420px",
        }}
      >
        <div className="spinner-border text-primary fs-6" role="status">
          <span className="visually-hidden ft-5">Loading...</span>
        </div>
      </div>
      <img
        src={img}
        alt="loading.."
        onLoad={() => setIsLoading()}
        height={"450px"}
        width={"420px"}
        className="shadow-1-strong rounded mb-4 image"
        style={{ display: isLoading ? "none" : "flex", cursor: "pointer" }}
      />
    </div>
  );
};

export default Image;
