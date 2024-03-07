// TownButton.js
import React from 'react';

const TownButton = ({ town, onClick }) => (
  <button onClick={onClick}>{town}</button>
);

export default TownButton;
