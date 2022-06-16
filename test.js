import EventEmitter from "events";
import { v4 as uuid } from "uuid";
import fsPromise from "fs/promises";
import fs from "fs";
import path from "path";

class myEventEmitter extends EventEmitter {}

const myEmmiter = new myEventEmitter();

export default function eventLogger(action) {
  myEmmiter.on("timestamp", (data) => {
    if (!fs.existsSync(path.resolve("logFolder"))) {
      fsPromise.mkdir("logFolder");
    }
    fsPromise.appendFile(
      path.resolve("logFolder", "timeLogger.txt"),
      `${data.id} \t ${data.time} \t ${data.action}\n `
    );
  });

  myEmmiter.emit("timestamp", {
    id: uuid(),
    time: new Date().toLocaleTimeString(),
    action: action || "-",
  });
}
