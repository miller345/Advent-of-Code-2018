let fs = require("fs");

fs.readFile("./inputs/day5.txt", "utf8", function(err, data) {
  let arr = data.split("");
  day5part1(arr);
  day5part2(arr);
});

function day5part1(arr) {
  arr = processPolymer(arr);
  console.log("Part 1:", arr.length);
}

function day5part2(arr) {
  let unitTypes = [...new Set(arr.map(v => v.toLowerCase()))];
  let variations = unitTypes.reduce((obj, unitType) => {
    let filteredArr = arr.filter(v => v.toLowerCase() !== unitType);
    return {
      ...obj,
      [unitType]: processPolymer(filteredArr).length
    };
  }, {});
  let minVal = Math.min(...Object.values(variations));
  console.log("Part2:", minVal);
}

function processPolymer(arr) {
  while (findNextReaction(arr) !== null) {
    arr = react(arr, findNextReaction(arr));
  }
  return arr;
}

// remove index and index + 1
function react(arr, index) {
  return arr.filter((val, i) => i !== index && i !== index + 1);
}

function findNextReaction(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let a = arr[i];
    let b = arr[i + 1];
    if (willReact(a, b)) {
      return i;
      break;
    }
  }
  return null; // no reaction found
}

function willReact(a, b) {
  return a !== b && a.toLowerCase() === b.toLowerCase();
}
