import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs, Link } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Image from "./Image";
import Loading from "./Loading";
import randomDogStore from "../store/RandomDogStore";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

function RandomDog() {
  const [dogs, setDogs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function getRandomDog() {
      await randomDogStore.getData();
      const images = toJS(randomDogStore.dogList);
      setDogs(images);
    }
    getRandomDog();
  }, []);

  const backHome = () => {
    navigate("/dog-explorer");
  };

  if (randomDogStore.loading) {
    return <Loading />;
  }
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

export default observer(RandomDog);
