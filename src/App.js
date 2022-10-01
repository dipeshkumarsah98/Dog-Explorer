import React from "react";
import BreedList from "./components/breedList";
import { Routes, Route } from "react-router-dom";
import DogDetail from "./components/DogDetail";
import RandomDog from "./components/RandomDog";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="App">
      <div className="bg-primary text-white py-3 mb-3">
        <h2 className="container display-5 lg:display-3">
          Welcome to Dog Explorer
        </h2>
      </div>

      <div className="container">
        <Routes>
          <Route path="dog/:breed" element={<DogDetail />} />
          <Route path="/dog/random" element={<RandomDog />} />
          <Route exact path="/" element={<BreedList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
