const EventEmitter = require("events");
const { v4: uuid } = require("uuid");
const fsPromise = require("fs/promises");
const fs = require("fs");
const path = require("path");

class myEventEmitter extends EventEmitter {}

const myEmmiter = new myEventEmitter();

function eventLogger(action) {
  myEmmiter.on("eventTracker", (data) => {
    if (!fs.existsSync(path.resolve("logFolder"))) {
      fsPromise.mkdir("logFolder");
    }
    fsPromise.appendFile(
      path.resolve("logFolder", "timeLogger.txt"),
      `${data.id} \t ${data.time} \t ${data.action}\n `
    );
  });

  myEmmiter.emit("eventTracker", {
    id: uuid(),
    time: new Date().toLocaleTimeString(),
    action: action || "-",
  });
}

module.exports.logger = eventLogger;
