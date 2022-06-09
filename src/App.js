import React from 'react';
import BreedList from './components/breedList';
import { Routes, Route, useNavigate } from 'react-router-dom';
import DogDetail from './components/DogDetail';
import RandomDog from './components/RandomDog';
import NotFound from './components/NotFound';

function App() {
  const navigate = useNavigate();
  return (


    <div className="App">
      <div className="container">
        <h2 className="display-3" onClick={() => navigate('/')}>Welcome to Dog api</h2>
        <Routes >
          <Route path='dog/:breed' element={<DogDetail />} />
          <Route path='/dog/random' element={<RandomDog />} />
          <Route exact path='/' element={<BreedList />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

      </div>
    </div>

  );
}

export default App;
