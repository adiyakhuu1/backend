const express = require("express");
const app = express();
const fs = require("node:fs");
const port = 4000;
const cors = require("cors");
app.use(express.json());
app.use(cors());

const findAllContents = () => {
  const data = fs.readFileSync("data.json");
  return JSON.parse(data);
};
const goBack = (cont) => {
  const contents = JSON.stringify(cont);
  return fs.writeFileSync("data.json", contents);
};
// create
app.post("/create", (req, res) => {
  // const name = req.params.name;

  console.log(req.body);
  const body = req.body;
  const data = fs.readFileSync("data.json");
  const content = JSON.parse(data);
  content.push({ ...body, id: Date.now() });
  goBack(content);
  console.log(req.body);
  res.send(content);
});

// read
app.get("/", (req, res) => {
  const content = findAllContents();
  console.log(content);
  res.send(content);
});

// find one
const findOne = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.send("not found");
  }
  const content = findAllContents();
  const movie = content.find((movie) => movie.id == id);
  console.log(typeof id);
  res.send(movie);
};
app.get("/details/:id", findOne);

// update
app.put("/update", (req, res) => {
  const body = req.body;
  // const  = req.query.deezName;
  const content = findAllContents();
  const isFound = content.find((movie) => movie.id == body.id);
  if (!isFound) {
    return res.send("Movie not found");
  }
  ``;
  const movies = content.map((movie) => {
    if (movie.id == body.id) {
      const edit = {
        ...movie,
        ...body,
        name: body.name,
      };
      return edit;
    } else {
      return movie;
    }
  });
  console.log(movies);
  goBack(movies);
  res.send(movies);
});

// delete
app.delete("/delete", (req, res) => {
  const { id } = req.body;
  const content = findAllContents();

  const movies = content.filter((movie) => {
    if (movie.id == id) {
      return;
    } else {
      return movie;
    }
  });

  goBack(movies);
  res.send(movies);
});

app.listen(port, () => {
  console.log(`read---------- http://localhost:${port}/`);
  console.log(`create---------- http://localhost:${port}/create/deezname`);
  console.log(`update------------- http://localhost:${port}/update/deezId`);
  console.log(`delte-------------- http://localhost:${port}/delete/deletedeez`);
});
