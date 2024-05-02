const express = require("express");
const app = express();
app.use(express.json());
const path = require("path");

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const {guardarPost, getPosts, like, updateLikes} = require('./consultas');

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


app.post("/post", async (req, res) => {
  try {
    //Variables del script en el HTML que guardan la info del usuario. 
    const { usuario, URL, descripcion } = req.body; 
    const likes = 0; 
    const result = await guardarPost([usuario, URL, descripcion, likes]); 
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// app.post("/post", async (req, res) => {
//   try {
//     const post = req.body;
//     const result = await guardarPost(post);
//     res.send(result);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

app.get("/posts", async (req, res) => {
  try {
    const posts = await getPosts();
    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/post", async (req, res) => {
  try {
    let { id } = req.query;
    const posts = await like(id);
    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});
