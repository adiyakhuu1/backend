const express = require("express");
const fs = require("node:fs");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("hi");
});
// Create
app.get("/create", (req, res) => {
  const date = Date.now();
  const name = req.query.name;
  const data = fs.readFileSync("data.json", "utf8");
  const movies = JSON.parse(data);
  movies.push({ id: date, name });
  const content = JSON.stringify(movies, null, 4);
  fs.writeFileSync("data.json", content);

  res.send("success");
});
// update
app.get("/update", (req, res) => {
  const data = fs.readFileSync("data.json", "utf8");
  const changingName = req.query.changingName;
  const changingId = req.query.changingId;
  const currentName = req.query.name;

  const movies = JSON.parse(data);
  const findTheOne = movies.filter((movie) => movie.id === changingId);
  const filterOthers = movies.filter((movie) => movie.name !== currentName);
  const edit = { ...findTheOne, name: changingName };
  filterOthers.push(edit);

  const content = JSON.stringify(filterOthers);
  fs.writeFileSync("data.json", content);
  res.send("done");
});

app.listen(port, () => {
  console.log(`listening http://localhost:${port}`);
});
