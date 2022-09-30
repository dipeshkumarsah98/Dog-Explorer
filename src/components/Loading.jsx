import React from "react";
import ReactLoading from "react-loading";
const Loading = () => {
  return (
    <div className="loading">
      <ReactLoading type={"spinningBubbles"} color={"blue"} />
    </div>
  );
};

export default Loading;
