require("dotenv").config();

const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");

app.use(express.json());

const posts = [
    {
        username: "Kayl",
        title: "Post 1",
    },
    {
        username: "Jim",
        title: "Post 2",
    },
];

// middleware
app.get("/posts", authenticateToken, (req, res) => {
    res.json(posts.filter((post) => post.username === req.user.name));
});

function authenticateToken(req, res, next) {
  const authHeder = req.headers["authorization"];
  const token = authHeder && authHeder.split(" ")[1]; // barer jhsfusdfh8eayrf7sdafhi - ['barer', 'jhsfusdfh8eayrf7sdafhi']
  if (token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(3000);
