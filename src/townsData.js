// Define towns and graph data in a separate file

export const towns = ["Rune", "Goddard", "Gludio", "Giran", "Dion", "Heine", "Schuttgart", "Aden", "Oren"];

export const graph = [
  [0, 10000, 53000, 59000, 57000, 82000, 10000, 37000, 10000],  // Rune
  [10000, 0, 71000, 63000, 71000, 83000, 10000, 8100, 37000],   // Goddard
  [53000, 71000, 0, 29000, 3400, 47000, 85000, 56000, 35000],   // Gludio
  [59000, 63000, 29000, 0, 6800, 7600, 87000, 13000, 9400],     // Giran
  [57000, 71000, 3400, 6800, 0, 12000, 88000, 52000, 33000],    // Dion
  [82000, 83000, 47000, 7600, 12000, 0, 100000, 59000, 50000],  // Heine
  [12000, 10000, 85000, 87000, 88000, 100000, 0, 53000, 59000], // Schuttgart
  [37000, 8100, 56000, 13000, 52000, 59000, 53000, 0, 6900],    // Aden
  [10000, 37000, 35000, 9400, 33000, 50000, 59000, 6900, 0],    // Oren
];

export const edges = [];

for (let i = 0; i < graph.length; i++) {
  for (let j = 0; j < graph[i].length; j++) {
    if (i !== j && graph[i][j] !== 0) {
      edges.push({
        path: [i, j],
        cost: graph[i][j],
      });
    }
  }
}

export const cities = towns.map((town) => ({
  name: town,
  x: Math.floor(Math.random() * 600) + 50,
  y: Math.floor(Math.random() * 400) + 50,
}));

export default cities;