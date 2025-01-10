// const express = require("express");
import express, { Express, Response, Request } from "express";
// import  from "express";
// const express, {RE}
const app: Express = express();
const fs = require("node:fs");
const port = 4000;
const cors = require("cors");
app.use(express.json());
app.use(cors());
type movie = {
  name: string;
  id: number;
  rating: number;
};
const findAllContents = () => {
  const data = fs.readFileSync("data.json");
  return JSON.parse(data);
};
const goBack = (cont: movie) => {
  const contents = JSON.stringify(cont);
  return fs.writeFileSync("data.json", contents);
};
// create
app.post("/create", (req, res) => {
  // const name = req.params.name;

  console.log(req.body);
  const body = req.body;

  const content = findAllContents();
  content.push({ ...body, id: Date.now() });
  goBack(content);
  console.log(req.body);
  res.send(content);
});

// read
app.get("/", (req: Request, res: Response) => {
  const content = findAllContents();
  if (!content) {
    res.json({ message: "not found!" });
  }

  console.log(content);
  res.send(content);
});

// find one

app.get("/details/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.send("not found");
    return;
  }
  const content = findAllContents();
  const movie = content.find((movie: movie) => movie.id == Number(id));
  console.log(typeof id);
  res.send(movie);
});

// update
app.put("/update", (req, res) => {
  const body = req.body;
  // const  = req.query.deezName;
  const content = findAllContents();
  const isFound = content.find((movie: movie) => movie.id == body.id);
  if (!isFound) {
    res.send("Movie not found");
    return;
  }
  const movies = content.map((movie: movie) => {
    if (movie.id == body.id) {
      const edit = {
        ...movie,
        ...body,
      };
      return edit;
    } else {
      return movie;
    }
  });
  goBack(movies);
  res.send(movies);
});

// delete
app.delete("/delete", (req: Request, res: Response) => {
  const { id } = req.body;
  const content = findAllContents();

  const movies = content.filter((movie: movie) => {
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
