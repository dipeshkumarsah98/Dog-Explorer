import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pagination from "./Pagination";
import { paginate } from "../utilits/paginate";
import dogBreedStore from "../store/DogBreedStore";
import Image from "./Image";

export default function DogDetail() {
  const [dogImage, setDogImage] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [totalDogImage, setTotalDogImage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
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
  }, [breed]);

  const handelPageChange = (page) => {
    setCurrentPage(page);
    const listedDogs = paginate(dogs, page, pageSize);
    setDogImage(listedDogs);
  };

  if (dogBreedStore.loading) return console.log("anything");

  return (
    <div>
      <h5 className="display-5">Image of {breed} dog</h5>
      <div className="row">
        {dogImage.map((dog, index) => (
          <Image img={dog} key={index} />
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
