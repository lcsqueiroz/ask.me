const Answer = require("../models/answer");

exports.createAnswer = async (req, res) => {
  const allowedFields = ["body", "questionId"];
  const sentFields = Object.keys(req.body || {});
  const hasExtraFields = sentFields.some(
    (field) => !allowedFields.includes(field),
  );

  if (hasExtraFields) {
    return res.status(400).json({
      error: "Security Alert",
      message: "Campos não permitidos foram detectados.",
    });
  }

  const { questionId, body } = req.body;
  const cleanBody = body ? body.trim() : "";

  if (!cleanBody || !questionId || isNaN(questionId)) {
    return res.status(400).json({
      error: "Validação Falhou",
      message:
        "O conteúdo da resposta e um ID de pergunta válido são obrigatórios.",
    });
  }

  try {
    const newAnswer = await Answer.create({
      body: cleanBody,
      questionId: questionId,
    });
    return res.status(201).json({
      message: "Resposta criada com sucesso!",
      data: newAnswer,
    });
  } catch (error) {
    console.error("Erro no Controller Answer:", error);
    return res.status(500).json({
      error: "Erro interno ao processar a requisição.",
    });
  }
};
