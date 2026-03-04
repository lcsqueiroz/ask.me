const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD") // Decompõe caracteres acentuados
    .replace(/[\u0300-\u036f]/g, "") // Remove os acentos
    .replace(/[^\w\s-]/g, "") // Remove caracteres que não são letras, números ou espaços
    .replace(/[\s_-]+/g, "-") // Substitui espaços e underscores por um único hífen
    .replace(/^-+|-+$/g, ""); // Remove hífens no início ou fim
};

module.exports = generateSlug;
