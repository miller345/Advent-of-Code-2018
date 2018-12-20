let fs = require("fs");

fs.readFile("./inputs/day5.txt", "utf8", function(err, data) {
  day5(data);
});

function day5(input) {
  let arr = input.split("");
  while (findNextReaction(arr) !== null) {
    arr = react(arr, findNextReaction(arr));
  }
  console.log("Part 1:", arr.length);
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
