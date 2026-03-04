require("dotenv").config();
const setupSecurity = require("./middleware/security");
const express = require("express");
const app = express();
const { Question, Answer } = require("./models/index");
const database = require("./config/database");
const questionRoutes = require("./routes/questionRoutes");
const answerRoutes = require("./routes/answerRoutes");

setupSecurity(app);

database
  .sync()
  .then(() => {
    console.log("Banco de dados sincronizado.");
  })
  .catch((error) => {
    console.error("Erro ao sincronizar banco:", error);
  });

app.use("/api/question", questionRoutes);
app.use("/api/answer", answerRoutes);

app.listen(8000, () => {
  console.log("Servidor rodando");
});
