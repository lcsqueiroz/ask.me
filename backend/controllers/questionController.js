const Question = require("../models/question");
const generateSlug = require("../utils/slugify");
require("../utils/slugify");

exports.createQuestion = async (req, res) => {
  const { title, description } = req.body;

  const cleanTitle = title ? title.trim() : "";
  const cleanDescription = description ? description.trim() : "";
  const slug = generateSlug(cleanTitle);

  if (!cleanTitle || !cleanDescription) {
    return res.status(400).json({
      error: "Validação falhou",
      message: "O título e a descrição são campos obrigatórios.",
    });
  }

  const allowedFields = ["title", "description"];
  const sentFields = Object.keys(req.body);
  const hasExtraFields = sentFields.some(
    (field) => !allowedFields.includes(field),
  );

  if (hasExtraFields) {
    return res.status(400).json({
      error: "Security Alert",
      message: "Campos não permitidos foram detectados na requisição.",
    });
  }

  try {
    const newQuestion = await Question.create({ title, description, slug });

    return res.status(201).json({
      message: "Pergunta criada com sucesso!",
      data: newQuestion,
      slug: slug,
    });
  } catch (error) {
    console.error("Erro no Controller Question:", error);
    return res
      .status(500)
      .json({ error: "Erro interno ao processar a requisição." });
  }
};
