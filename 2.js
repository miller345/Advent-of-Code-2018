let input = require("./inputs").day2;

let boxes = input
  .split(/\s/g) // split each box (by whitespace)
  .map(box => box.split("").sort()); // create a sorted array for each box

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

console.log(results);
console.log(results.double * results.tripple);
