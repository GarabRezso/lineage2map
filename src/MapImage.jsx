import React, { useEffect, useRef, useState } from 'react';
import { getPathTo } from './utils';
import { dijkstra } from './dijkstra';
// Inside MapImage.jsx
const MapImage = ({ towns, graph, selectedTown }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    const selectedTownIndex = towns.indexOf(selectedTown);
    const { distances, path } = dijkstra(graph, selectedTownIndex);
    // Dummy data for testing
    const cities = [
      { name: 'Rune', x: 836, y: 1050 },
      { name: 'Goddard', x: 1395, y: 1026 },
      { name: 'Gludio', x: 581, y: 1919 },
      { name: 'Giran', x: 1056, y: 2031 },
      { name: 'Dion', x: 750, y: 2027 },
      { name: 'Heine', x: 1216, y: 2409 },
      { name: 'Schuttgart', x: 1100, y: 589 },
      { name: 'Aden', x: 1393, y: 1431 },
      { name: 'Oren', x: 1081, y: 1583 },
    ];

    //const paths = ['Rune -> Goddard','Rune -> Gludio','Rune -> Giran','Rune -> Dion','Rune -> Heine','Rune -> Schuttgart','Rune -> Aden','Rune -> Oren','Goddard -> Gludio','Goddard -> Giran','Goddard -> Dion','Goddard -> Heine','Goddard -> Schuttgart','Goddard -> Aden','Goddard -> Oren','Gludio -> Giran','Gludio -> Dion','Gludio -> Heine','Gludio -> Schuttgart','Gludio -> Aden','Gludio -> Oren','Giran -> Dion','Giran -> Heine','Giran -> Schuttgart','Giran -> Aden','Giran -> Oren','Dion -> Heine','Dion -> Schuttgart','Dion -> Aden','Dion -> Oren','Heine -> Schuttgart','Heine -> Aden','Heine -> Oren','Schuttgart -> Aden','Schuttgart -> Oren','Aden -> Oren'];
    //const paths = getPathTo(index);

    // Drawing cities
    cities.forEach((city) => {
      context.beginPath();
      context.arc(city.x, city.y, 10, 0, 2 * Math.PI);
      context.fillStyle = 'blue';
      context.fill();
      context.closePath();
    });

    // Drawing paths
    towns.forEach((town, index) => {
      if (index !== selectedTownIndex) {
        const finalPath = getPathTo(towns, path, selectedTown, index);
        const townCoords = cities.find((city) => city.name === town);
        context.beginPath();
        context.moveTo(townCoords.x, townCoords.y);

        const pathArray = finalPath.split(' -> ');

        for (let i = 0; i < pathArray.length - 1; i++) {
          const currentTown = pathArray[i];
          const nextTown = pathArray[i + 1];
        
          const currentTownCoords = cities.find((city) => city.name === currentTown);
          const nextTownCoords = cities.find((city) => city.name === nextTown);

          context.strokeStyle = getRandomColor(); 

          context.moveTo(currentTownCoords.x, currentTownCoords.y);
          context.lineTo(nextTownCoords.x, nextTownCoords.y);
        }
        context.lineWidth = 3;
        context.stroke();
        context.closePath();
      }
    });
  }, [towns, graph, selectedTown]);

  return <canvas ref={canvasRef} id="mapCanvas" width={1812} height={2620} />;
};

export default MapImage;

//színválasztó függvény
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}