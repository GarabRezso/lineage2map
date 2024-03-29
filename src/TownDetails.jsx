import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { dijkstra } from './dijkstra';
import { getPathTo } from './utils';
import chatbox from './assets/l2_chatbox.png';
import Navbar from './navbar';
const TownDetails = ({ selectedTown, graph, towns}) => {
  const [distancesFromSelectedTown, setDistancesFromSelectedTown] = useState([]);
  const [pathTo, setPathTo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const formattedNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const isTownValid = (town) => towns.includes(town);

  const calculateDistancesAndPath = useMemo(() => {
    if (!selectedTown || !graph || !towns) return; // Early exit if data is missing

    try {
      const selectedTownIndex = towns.indexOf(selectedTown);

      if (selectedTownIndex === -1) {
        throw new Error(`Town not found: ${selectedTown}`);
      }

      const { distances, path } = dijkstra(graph, selectedTownIndex);
      return { distances, path };
      
    } catch (error) {
      console.error("Error in useEffect:", error);
      setError(`An error occurred: ${error.message || "Unknown error"}`);
      return null; // Return null to prevent setting incorrect state
    }
  }, [selectedTown, graph, towns]);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    if (calculateDistancesAndPath) { // Check if data is available before processing
      const { distances, path } = calculateDistancesAndPath;
      setDistancesFromSelectedTown(distances);
      setPathTo(path);
    }

    setIsLoading(false);
  }, [calculateDistancesAndPath,selectedTown]);

  return (
    <div className="content-container">
    <img src={chatbox} className="logo react" alt="Chatbox logo" />
    <div className="table-container">
      <Navbar towns={towns} />
      <div className="text">
      <h2>Town of {selectedTown}</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && distancesFromSelectedTown.length > 0 && (
        <table aria-label={`Distances from ${selectedTown}`} role="table">
          <thead>
            <tr>
              <th>Town</th>
              <th>Adena</th>
              <th>Path</th>
            </tr>
          </thead>
          <tbody>
            {distancesFromSelectedTown.map((distance, index) => {
              if (index !== towns.indexOf(selectedTown)) {
                return (
                  <tr key={index}>
                    <td>{towns[index]}</td>
                    <td>{formattedNumber(distance)}</td>
                    <td>{getPathTo(towns, pathTo, selectedTown, index)}</td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      )}
          </div>
        </div>
      </div>
  );
};

TownDetails.propTypes = {
  selectedTown: PropTypes.string.isRequired,
  graph: PropTypes.array.isRequired,
  towns: PropTypes.array.isRequired,
};

export default TownDetails;

