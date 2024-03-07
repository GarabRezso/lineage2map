import React, { useEffect, useRef } from 'react';
import map from './assets/map.jpg';
// Inside MapImage.jsx
const MapImage = ({ towns }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

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

    const paths = ['Rune -> Goddard','Rune -> Gludio','Rune -> Giran','Rune -> Dion','Rune -> Heine','Rune -> Schuttgart','Rune -> Aden','Rune -> Oren','Goddard -> Gludio','Goddard -> Giran','Goddard -> Dion','Goddard -> Heine','Goddard -> Schuttgart','Goddard -> Aden','Goddard -> Oren','Gludio -> Giran','Gludio -> Dion','Gludio -> Heine','Gludio -> Schuttgart','Gludio -> Aden','Gludio -> Oren','Giran -> Dion','Giran -> Heine','Giran -> Schuttgart','Giran -> Aden','Giran -> Oren','Dion -> Heine','Dion -> Schuttgart','Dion -> Aden','Dion -> Oren','Heine -> Schuttgart','Heine -> Aden','Heine -> Oren','Schuttgart -> Aden','Schuttgart -> Oren','Aden -> Oren'];
    
    // Load JPG image
    <img src={map}  alt="map" />

    // Drawing cities
    cities.forEach((city) => {
      context.beginPath();
      context.arc(city.x, city.y, 5, 0, 2 * Math.PI);
      context.fillStyle = 'blue';
      context.fill();
      context.closePath();
    });

    // Drawing paths
    paths.forEach((path) => {
      const pathTowns = path.split(' -> ');
      context.beginPath();
      context.moveTo(
        cities.find((city) => city.name === pathTowns[0]).x,
        cities.find((city) => city.name === pathTowns[0]).y
      );

      pathTowns.forEach((town) => {
        const townCoords = cities.find((city) => city.name === town);
        context.lineTo(townCoords.x, townCoords.y);
      });

      context.strokeStyle = 'green';
      context.lineWidth = 3;
      context.stroke();
      context.closePath();
    });
  }, [towns]);

  return <canvas ref={canvasRef} id="mapCanvas" width={1812} height={2620} />;
};

export default MapImage;
