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
        if (coordsFreq[key]) {
          // already overlap
          coordsFreq[key] = [...coordsFreq[key], rect.id];
        } else {
          // no current overlap
          coordsFreq[key] = [rect.id];
        }
      }
    }
  });
  let dups = Object.keys(coordsFreq)
    .filter(key => coordsFreq[key].length > 1)
    .map(key => coordsFreq[key]);
  console.log("Part 1:", dups.length);
  let overlappingIds = dups.flat(); // has dups
  let noOverlaps = rects
    .map(r => r.id)
    .filter(id => !overlappingIds.includes(id));
  console.log("Part 2:", noOverlaps);
}
