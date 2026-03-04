require("dotenv").config();
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const toobusy = require("toobusy-js");
const bodyParser = require("body-parser");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5,
  message: "Muitas requisições vindas deste IP, tente novamente mais tarde.",
  statusCode: 429,
  message: {
    status: 429,
    error: "Too Many Requests",
    message:
      "Você atingiu o limite de perguntas por IP. Tente novamente em 15 minutos.",
  },
});

const setupSecurity = (app) => {
  app.use(helmet());
  app.use(cors({ origin: process.env.FRONTEND_URL || "*" })); // *: "Tudo" ou "Qualquer um" (dev)
  app.use(limiter);
  app.use(bodyParser.json({ limit: "1024kb" }));

  app.use((req, res, next) => {
    if (toobusy()) {
      res.status(503).send("Servidor muito ocupado no momento.");
    } else {
      next();
    }
  });
};

module.exports = setupSecurity;
