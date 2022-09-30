import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs, Link } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import http from "../services/httpService";
import Image from "./Image";
import Loading from "./Loading";

export default function RandomDog() {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    async function getRandomDog() {
      const { data } = await http.get(
        "https://dog.ceo/api/breeds/image/random/5"
      );
      setDogs(data.message);
      setLoading(false);
    }
    getRandomDog();
  }, []);

  const backHome = () => {
    navigate("/");
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
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
            <ShuffleIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {"random"}
          </Link>
        </Breadcrumbs>
        <h1 className="display-5 my-3">Random Dogs</h1>
        <div className="row">
          {dogs.map((dog, index) => (
            <Image img={dog} key={index} />
          ))}
        </div>
      </div>
    );
  }
}
