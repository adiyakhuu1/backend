const express = require("express");
const app = express();
const fs = require("node:fs");
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  const body = req.body;
  const data = fs.readFileSync("data.json");
  const content = JSON.parse(data);
  content.push({ id: Date.now(), ...body });
  goBack(content);
  console.log(req.body);
  res.send("hi");
});

// read
app.get("/", (req, res) => {
  const content = findAllContents();
  console.log(content);
  res.send(req.body);
});

// find one
const findOne = (req, res) => {
  const { deezId } = req.body;
  const content = findAllContents();
  const movie = content.find((movie) => movie.id === deezId);
  console.log(typeof deezId);
  res.send(movie);
};
app.get("/details/:id", findOne);

// update
app.put("/update/deezId", (req, res) => {
  const body = req.body;
  // const  = req.query.deezName;
  const content = findAllContents();
  const isFound = content.find((movie) => movie.id == body.id);
  if (!isFound) {
    return res.send("Movie not found");
  }
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
  res.send("done");
});

// delete
app.delete("/delete/:id", (req, res) => {
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
  res.send("done nuts");
});

app.listen(port, () => {
  console.log(`read---------- http://localhost:3000/`);
  console.log(`create---------- http://localhost:3000/create/deezname`);
  console.log(`update------------- http://localhost:3000/update/deezId`);
  console.log(`delte-------------- http://localhost:3000/delete/deletedeez`);
});
