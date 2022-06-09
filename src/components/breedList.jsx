import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import httpService from '../services/httpService';
import Pagination from './Pagination';
import Search from './Search';
import Button from '@mui/material/Button';
import { paginate } from '../utilits/paginate';


export default function BreedList() {
    //breedlist will be object because server returns object
    const navigate = useNavigate();
    const [breedList, setBreedList] = useState([]);
    const [currentBreed, setCurretBreed] = useState([...Object.keys(breedList)]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalBreed, setTotalBreed] = useState(0);
    const pageSize = 10; //size of page to show user
    // let totalBreed = Object.keys(breedList).length; //getting total number of breeds from server
    // const indexOfLastBreed = currentPage * pageSize; //getting index of last item
    // const indexOfFirstBreed = indexOfLastBreed - pageSize; //getting index of first item
    // let currentBreed = Object.keys(breedList).slice(indexOfFirstBreed, indexOfLastBreed); //getting the breed with page number


    useEffect(() => {
        async function getBreed() {
            const { data: breed } = await httpService.get('https://dog.ceo/api/breeds/list/all');
            setBreedList(breed.message);
            const filteredBreed = paginate(Object.keys(breed.message), 1, pageSize);
            setCurretBreed(filteredBreed);
            setTotalBreed(Object.keys(breed.message).length);
        }
        getBreed();
        setIsLoading(false);
    }, []) //single big empty bracket will indicate it as component did mount


    const handelPageChange = page => {
        setCurrentPage(page); //this will set the page number we will click on current page
        const filteredBreed = paginate(Object.keys(breedList), page, pageSize);
        setCurretBreed(filteredBreed);

    }

    const handelSearch = (e) => {
        const value = e.target.value.toLowerCase();
        let result = [];
        result = Object.keys(breedList).filter(data => {
            return data.toLowerCase().includes(value); //searching entered value in data base and returning it

        });
        setTotalBreed(result.length);
        const filteredBreed = paginate(result, 1, pageSize);
        setCurretBreed(filteredBreed);
    }

    const handelClick = (breed) => {
        navigate(`dog/${breed}`);
    }

    if (isLoading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    } else {
        return (
            <div className="breed">

                <Button variant="outlined" onClick={() => {
                    navigate('dog/random')
                }}>Get Random Dog</Button>


                <div className="input-group mb-3">
                    <Search handelChange={handelSearch} />
                </div>

                <ul className='list-group m-3'>
                    <h2 className='display-5'>List of dog Breed</h2>
                    {currentBreed.length === 0 ? <h2 className='display-5'>No result found</h2> : currentBreed.map((breed, index) => (
                        <li onClick={() => handelClick(breed)} key={index} className='list-group-item clickable list-group-item-light m-1'>{breed}</li>

                    ))}

                </ul>

                <Pagination
                    itemCount={totalBreed}
                    pageChange={handelPageChange}
                    currentPage={currentPage}
                    pageSize={pageSize}
                />
            </div>
        )
    }
}