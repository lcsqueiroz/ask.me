require("dotenv").config();
const setupSecurity = require("./middleware/security");
const express = require("express");
const app = express();
const { Question, Answer } = require("./models/index");
const database = require("./config/database");
const questionRoutes = require("./routes/questionRoutes");

setupSecurity(app);

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

app.use("/api/question", questionRoutes);

app.listen(8000, () => {
  console.log("Servidor rodando");
});
