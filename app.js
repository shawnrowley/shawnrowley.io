const express = require("express");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/cover.html");
});

app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/index.html");
})

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is up and running on port 3000");
});
