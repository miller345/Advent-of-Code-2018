let input = require("./inputs").day1;

let freqList = input
  .replace(/\s/g, "") // remove whitespace
  .split(/(?=[+-])/g) // split (but keep) by + or -
  .map(a => parseInt(a, 10)); // to int
let sum = freqList.reduce((a, b) => a + b, 0); // add them up
console.log("Sum:", sum);
let duplicateFound = false;
let n = 0;
let currentVal = 0;
let results = { "0": true };
let answer = null;
// console.log(freqList.length); //996
while (!duplicateFound) {
  let i = n % freqList.length;
  currentVal = currentVal + freqList[i];
  //console.log(i, currentVal);
  if (results[currentVal.toString()]) {
    duplicateFound = true;
    console.log("First duplicate:", currentVal);
  } else {
    results[currentVal.toString()] = true;
  }
  n++;
}
