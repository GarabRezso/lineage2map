import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TownDetails from './TownDetails';
import { towns, graph, edges, cities } from './townsData';

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
            <MapImage towns={towns} graph={graph} selectedTown={town}/>
            <TownDetails selectedTown={town} graph={graph} towns={towns}/>
          </>
        }
      />
    ));
  };

  return (
    <Router>
            <Routes>{renderTownRoutes()}</Routes>
    </Router>
  );
}

export default App;
