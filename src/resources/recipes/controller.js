const prisma = require("../../utils/database");

const getAll = async (req, res) => {
  console.log({ recipes: prisma.recipe });

  try {
    const data = await prisma.recipe.findMany();

    res.json({ data });
  } catch (error) {
    console.error("[ERROR] getAll: ", { error });
    res.json({ error });
  }
};

module.exports = { getAll };
