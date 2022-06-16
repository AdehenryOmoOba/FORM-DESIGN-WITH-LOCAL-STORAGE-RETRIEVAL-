const { logger } = require("./logger.js");
const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/api", (req, res) => {
  logger("API request");
  res.status(200).json({ user: "adehenry" });
});

const PORT = process.env.PORT || 2500;
app.listen(PORT, () => {
  logger(`Server start`);
  console.log(`Server running on port 2500...`);
});
