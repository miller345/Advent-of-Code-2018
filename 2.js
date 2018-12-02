let input = require("./inputs").day2;

let boxes = input
  .split(/\s/g) // split each box (by whitespace)
  .map(box => box.split("")); // create an array for each box

let results = boxes.reduce(
  (obj, box) => {
    let freq = box.reduce((freq, val) => {
      return {
        ...freq,
        [val]: freq[val] ? freq[val] + 1 : 1
      };
    }, {});
    let freqFreq = Object.values(freq);
    return {
      double: obj.double + freqFreq.includes(2),
      tripple: obj.tripple + freqFreq.includes(3)
    };
  },
  { double: 0, tripple: 0 }
);

console.log("Part 1:", results.double * results.tripple);

// for every single box
for (i = 0; i < boxes.length; i++) {
  let box = boxes[i];
  // compare to every other box
  for (j = i + 1; j < boxes.length; j++) {
    let otherBox = boxes[j];
    // and find differnces
    let indexes = box.reduce((indexes, val, i) => {
      if (val === otherBox[i]) {
        return indexes;
      } else {
        return [...indexes, i];
      }
    }, []);
    if (indexes.length == 1) {
      let common = [...box];
      common.splice(indexes[0], 1);
      console.log("Part 2:", common.join(""));
      break;
    }
  }
}
