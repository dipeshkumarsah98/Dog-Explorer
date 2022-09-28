import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../services/httpService";
import Pagination from "./Pagination";
import { paginate } from "../utilits/paginate";
import dogBreedStore from "../store/DogBreedStore";

export default function DogDetail() {
  const [dogImage, setDogImage] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [totalDogImage, setTotalDogImage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { breed } = useParams();
  const pageSize = 12;
  useEffect(() => {
    async function getDogs() {
      await dogBreedStore.getDogDetail(breed);
      const dogs = dogBreedStore.dogImageList;
      const listedDogs = paginate(dogs, 1, pageSize);
      setTotalDogImage(dogs.length);
      setDogImage(listedDogs);
      setDogs(dogs);
    }
    getDogs();
    setIsLoading(false);
  }, [breed]);

  const handelPageChange = (page) => {
    setCurrentPage(page);
    const listedDogs = paginate(dogs, page, pageSize);
    setDogImage(listedDogs);
  };
  if (isLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  } else {
    return (
      <div>
        <h5 className="display-5">Image of {breed} dog</h5>
        <div className="row">
          {dogImage.map((dog, index) => (
            <div className="col-lg-4 mb-4 mb-lg-0" key={index}>
              <img
                src={dog}
                alt="loading.."
                key={index}
                className="w-100 shadow-1-strong rounded mb-4 default-size"
              />
            </div>
          ))}
        </div>
        <Pagination
          itemCount={totalDogImage}
          pageChange={handelPageChange}
          currentPage={currentPage}
          pageSize={12}
        />
      </div>
    );
  }
}
