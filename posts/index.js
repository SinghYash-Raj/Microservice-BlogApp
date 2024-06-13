const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json()); //parses json into string

const posts = {}; // empty object of posts

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
