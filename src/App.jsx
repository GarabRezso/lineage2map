import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TownDetails from './TownDetails';
import { towns, graph, edges, cities } from './townsData';
import Navbar from './navbar';
import MapImage from './MapImage';
import chatbox from './assets/l2_chatbox.png';
import './App.css';

function App() {
  const [paths, setPaths] = useState([]);

  const renderTownRoutes = () => {
    return towns.map((town) => (
      <Route
        key={town}
        path={`/${town}`}
        element={
          <>
            <TownDetails selectedTown={town} graph={graph} towns={towns} />
          </>
        }
      />
    ));
  };

  return (
    <Router>
      <div className="content-container">
        <img src={chatbox} className="logo react" alt="Chatbox logo" />
        <div className="table-container">
          <Navbar towns={towns} />
          <div className="text">
            <Routes>{renderTownRoutes()}</Routes>
          </div>
        </div>
      </div>
      <MapImage towns={towns}/>
    </Router>
  );
}

export default App;
