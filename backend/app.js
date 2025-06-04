const express = require("express");
const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", (req, res) => {
  res.json({ name: "John Doe", age: 30 });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
