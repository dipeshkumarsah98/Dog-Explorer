import React from "react";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Breadcrumbs, Link } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import { red } from "@mui/material/colors";
export default function NotFound() {
  const navigate = useNavigate();
  const backHome = () => {
    navigate("/");
  };

  return (
    <>
      <div className="d-flex align-items-center my-3 " onClick={backHome}>
        <ArrowBackIosIcon
          sx={{ cursor: "pointer" }}
          fontSize="large"
          color="primary"
        />
        <span style={{ fontSize: "30px", cursor: "pointer" }}>Home</span>
      </div>
      <Breadcrumbs aria-label="breadcrumb" className="my-3">
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center", fontSize: "20px" }}
          color="inherit"
          onClick={backHome}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center", fontSize: "20px" }}
          color="inherit"
        >
          <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Not Found
        </Link>
      </Breadcrumbs>
      <div className="d-flex gap-2 align-items-center">
        <SentimentVeryDissatisfiedIcon
          sx={{ color: red[500], fontSize: "40px" }}
        />
        <h2 style={{ color: red[500], fontSize: "40px" }}>Not Found</h2>
      </div>
    </>
  );
}
