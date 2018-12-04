let fs = require("fs");

fs.readFile("./inputs/day4.txt", "utf8", function(err, data) {
  day4(data);
});

function day4(input) {
  let onDuty; //id
  var events = input
    .split(/\r?\n/)
    .sort()
    .map(str => {
      let eventStr = str.split("]")[1];
      let event;
      if (eventStr.includes("#")) {
        event = "begin";
        onDuty = parseInt(eventStr.replace(/\D/g, ""), 10);
      }
      if (eventStr.includes("asleep")) {
        event = "asleep";
      }
      if (eventStr.includes("wakes")) {
        event = "awake";
      }
      return {
        //str,
        id: onDuty,
        event,
        date: str.split("]")[0].replace("[", "")
      };
    })
    .filter(e => e.event !== "begin"); // just awake/sleep events
  console.log(events);
}
