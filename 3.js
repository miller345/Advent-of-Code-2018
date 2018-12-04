let fs = require("fs");

fs.readFile("./inputs/day3.txt", "utf8", function(err, data) {
  day3(data);
});

function day3(input) {
  var lines = input.split(/\r?\n/);
  var rects = lines.map(str => {
    let arr = str.split(" ");
    return {
      id: parseInt(arr[0].replace("#", ""), 10),
      x: parseInt(arr[2].split(",")[0], 10),
      y: parseInt(arr[2].split(",")[1].replace(":", ""), 10),
      width: parseInt(arr[3].split("x")[0], 10),
      height: parseInt(arr[3].split("x")[1], 10)
    };
  });
  let coordsFreq = {};
  rects.forEach(rect => {
    for (x = rect.x; x < rect.x + rect.width; x++) {
      for (y = rect.y; y < rect.y + rect.height; y++) {
        let key = `${x},${y}`;
        coordsFreq[key] = coordsFreq[key] ? coordsFreq[key] + 1 : 1;
      }
    }
  });
  let dups = Object.keys(coordsFreq)
    .filter(key => coordsFreq[key] > 1)
    .map(key => coordsFreq[key]);
  console.log("Part 1:", dups.length);
}
