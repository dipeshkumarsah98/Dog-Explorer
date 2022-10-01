import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumbs, Link } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Pagination from "./Pagination";
import { paginate } from "../utilits/paginate";
import dogBreedStore from "../store/DogBreedStore";
import Image from "./Image";
import Loading from "./Loading";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

function DogDetail() {
  const [dogImage, setDogImage] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [totalDogImage, setTotalDogImage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { breed } = useParams();
  const pageSize = 12;

  const navigate = useNavigate();

  useEffect(() => {
    async function getDogs() {
      await dogBreedStore.getDogDetail(breed);
      const dogs = toJS(dogBreedStore.dogImageList);
      const listedDogs = paginate(dogs, 1, pageSize);
      setTotalDogImage(dogs.length);
      setDogImage(listedDogs);
      setDogs(dogs);
    }
    getDogs();
  }, [breed]);

  const handelPageChange = (page) => {
    setCurrentPage(page);
    const listedDogs = paginate(dogs, page, pageSize);
    setDogImage(listedDogs);
  };
  const backHome = () => {
    navigate("/dog-explorer");
  };

  if (dogBreedStore.loading) return <Loading />;

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
          {breed}
        </Link>
      </Breadcrumbs>
      <h5 className="display-5 fw-normal my-3">Image of {breed} dog</h5>
      <div className="row">
        {dogImage.map((dog, index) => (
          <Image img={dog} key={index} />
        ))}
      </div>
      {dogs?.length > 12 && (
        <Pagination
          itemCount={totalDogImage}
          pageChange={handelPageChange}
          currentPage={currentPage}
          pageSize={12}
        />
      )}
    </>
  );
}

export default observer(DogDetail);
