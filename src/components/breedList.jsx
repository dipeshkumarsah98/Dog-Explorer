import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { paginate } from "../utilits/paginate";
import Search from "./Search";
import Pagination from "./Pagination";
import dogBreedStore from "../store/DogBreedStore.js";
import Loading from "./Loading";

function BreedList() {
  const navigate = useNavigate();
  const [breedList, setBreedList] = useState([]);
  const [currentBreed, setCurrentBreed] = useState([...Object.keys(breedList)]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBreed, setTotalBreed] = useState(0);
  const pageSize = 10; //size of page to show user

  useEffect(() => {
    async function getBreed() {
      await dogBreedStore.getData();
      const breed = toJS(dogBreedStore.breedList);
      setBreedList(breed);
      const filteredBreed = paginate(breed, 1, pageSize);
      setCurrentBreed(filteredBreed);
      setTotalBreed(breed.length);
    }
    getBreed();
  }, []); //single big empty bracket will indicate it as component did mount

  const handelPageChange = (page) => {
    setCurrentPage(page); //this will set the page number we will click on current page
    const filteredBreed = paginate(breedList, page, pageSize);
    setCurrentBreed(filteredBreed);
  };

  const handelSearch = (e) => {
    const value = e.target.value.toLowerCase();
    let result = [];
    result = breedList.filter((data) => {
      return data.toLowerCase().includes(value); //searching entered value in data base and returning it
    });
    const filteredBreed = paginate(result, 1, pageSize);
    setTotalBreed(result.length);
    setCurrentBreed(filteredBreed);
  };

  const handelClick = (breed) => {
    navigate(`/dog/${breed}`);
  };

  if (dogBreedStore.loading) return <Loading />;

  return (
    <div>
      <button
        className="btn btn-secondary fs-4"
        onClick={() => {
          navigate("/dog/random");
        }}
      >
        Get random Dog
      </button>

      <div className="input-group">
        <Search handelChange={handelSearch} />
      </div>

      <ul className="list-group my-3">
        <h2 className="display-5">List of dog Breed</h2>
        {currentBreed.length === 0 ? (
          <h2 className="display-5 fw-normal">No result found</h2>
        ) : (
          currentBreed.map((breed, index) => (
            <li
              onClick={() => handelClick(breed)}
              key={index}
              className="fs-4 list-group-item clickable list-group-item-light m-1 breed-item"
            >
              {breed}
            </li>
          ))
        )}
      </ul>

      {currentBreed?.length !== 0 && (
        <Pagination
          itemCount={totalBreed}
          pageChange={handelPageChange}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      )}
    </div>
  );
}

export default observer(BreedList);
