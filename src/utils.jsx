// Inside utils.js
export const getPathTo = (towns, pathTo, selectedTown, end) => {
  const pathToArr = [];
  let current = end;

  while (current !== null) {
    const townName = towns[current];
    //if (townName !== selectedTown) {
      pathToArr.unshift(townName);
    //}
    current = pathTo[current];
  }

  return pathToArr.join(" -> ");
};
