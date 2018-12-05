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
  //console.log(events);
  let days = {};
  let current = {
    id: null,
    day: null
  };
  events.forEach(e => {
    current.day = e.date.split(" ")[0];
    current.id = e.id;
    let minute = parseInt(e.date.split(" ")[1].split(":")[1], 10);
    // first event
    if (!days[current.day]) {
      days[current.day] = {
        id: current.id,
        asleep: []
      };
    }
    if (e.event === "asleep") {
      days[current.day].asleep.push([minute]);
    }
    if (e.event === "awake") {
      days[current.day].asleep[days[current.day].asleep.length - 1].push(
        minute - 1
      );
    }
  });
  //console.log(JSON.stringify(days));
  //console.log(days);
  let guards = Object.keys(days).reduce((obj, key) => {
    let day = days[key];
    let total = day.asleep.reduce((total, range) => {
      return total + (range[1] - range[0]);
    }, 0);
    return {
      ...obj,
      [day.id]: {
        asleep: [...(obj[day.id] ? obj[day.id].asleep : []), ...day.asleep],
        total: obj[day.id] ? obj[day.id].total + total : total
      }
    };
  }, {});
  //console.log(JSON.stringify(guards));
  let maxTotal = Math.max(...Object.values(guards).map(o => o.total));
  //console.log(maxTotal);
  let maxTotalId = parseInt(
    Object.keys(guards).filter(id => guards[id].total === maxTotal),
    10
  );
  let maxTotalAsleep = guards[maxTotalId].asleep;
  //console.log(maxTotalId, maxTotalAsleep);
  let mins = maxTotalAsleep
    .map(arr => range(arr[0], arr[1]))
    .flat()
    .reduce((obj, m) => {
      return {
        ...obj,
        [m]: obj[m] ? obj[m] + m : m
      };
    }, {});
  //console.log(mins);
  let maxMins = Math.max(...Object.values(mins));
  console.log(maxMins);
  let id = parseInt(Object.keys(mins).filter(m => mins[m] === maxMins), 10);
  console.log(id);
  console.log("Part 1:", id * maxMins); //wrong :(
}

function range(from, to) {
  var arr = [];
  for (let i = from; i <= to; i++) {
    arr.push(i);
  }
  return arr;
}
