const express = require("express");
const app = express();
const fs = require("node:fs");
const port = 3000;

// create
app.get("/create", (req, res) => {
  const name = req.query.name;
  const data = fs.readFileSync("data.json");
  const content = JSON.parse(data);
  content.push({ id: Date.now(), name });
  const contentJSON = JSON.stringify(content);
  fs.writeFileSync("data.json", contentJSON);
  res.send("done");
});

// read
app.get("/", (req, res) => {
  const data = fs.readFileSync("data.json");
  const content = JSON.parse(data);
  console.log(content);
  res.send(content);
});

// update
app.get("/update", (req, res) => {
  const deezId = req.query.deezId;
  const deezName = req.query.deezName;
  const data = fs.readFileSync("data.json");
  const content = JSON.parse(data);

  const movies = content.map((movie) => {
    if (movie.id == deezId) {
      const edit = {
        ...movie,
        name: deezName,
      };
      return edit;
    } else {
      return movie;
    }
  });
  console.log(movies);

  const moviesJSON = JSON.stringify(movies);
  fs.writeFileSync("data.json", moviesJSON);
  res.send("done");
});

// delete
app.get("/delete", (req, res) => {
  const deezId = req.query.chosenId;
  const data = fs.readFileSync("data.json");
  const content = JSON.parse(data);

  const movies = content.filter((movie) => {
    if (movie.id == deezId) {
      return;
    } else {
      return movie;
    }
  });

  const moviesJSON = JSON.stringify(movies);
  fs.writeFileSync("data.json", moviesJSON);
  res.send("done nuts");
});

app.listen(port, () => {
  console.log(`read---------- http://localhost:3000/`);
  console.log(
    `create---------- http://localhost:3000/create?name=randomName${Math.floor(
      Math.random() * 100000
    )}`
  );
  console.log(
    `update------------- http://localhost:3000/update?deezId=&deezName=`
  );
  console.log(`delte-------------- http://localhost:3000/delete?chosenId=`);
});
