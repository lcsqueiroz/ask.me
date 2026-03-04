const Question = require("./question");
const Answer = require("./answer");

Question.hasMany(Answer, {
  foreignKey: "questionId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Answer.belongsTo(Question, {
  foreignKey: "questionId",
});

module.exports = { Question, Answer };
