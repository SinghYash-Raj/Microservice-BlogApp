const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  // Fetch or initialize the comments array for the given post ID
  const comments = commentsByPostId[req.params.id] || [];

  // Add the new comment to the comments array
  comments.push({ id: commentId, content });

  // Update the commentsByPostId object
  commentsByPostId[req.params.id] = comments;

  // Send the response with status 201 and the comments array
  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
