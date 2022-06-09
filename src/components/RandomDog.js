import React, { useEffect, useState } from 'react';
import http from '../services/httpService';

export default function RandomDog() {
    const [dogs, setDogs] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function getRandomDog() {
            const { data } = await http.get('https://dog.ceo/api/breeds/image/random/5');
            setDogs(data.message)
            setLoading(false);
        }
        getRandomDog();
    }, []);

    if (loading) {
        return (
            <div className="loading">

                <h1>Loading...</h1>
            </div>
        )
    } else {
        return (
            <div>
                <h1 className='display-4'>Random Rog</h1>
                <div className="row">
                    {dogs.map((dog, index) => (
                        <div key={index} className="col-lg-4 mb-4 mb-lg-0">
                            <img src={dog} alt={dog} className='default-size m-1' />

                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
