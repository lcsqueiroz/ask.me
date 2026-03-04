require("dotenv").config();
const express = require("express");
const app = express();
const { Question, Answer } = require("./models/index");
const database = require("./config/database");

database
  .sync()
  .then(() => {
    console.log("Banco de dados sincronizado.");
  })
  .catch((error) => {
    console.error("Erro ao sincronizar banco:", error);
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(8000, () => {
  console.log("Servidor rodando");
});
