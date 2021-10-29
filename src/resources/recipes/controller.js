const prisma = require("../../utils/database");

const getAll = async (req, res) => {
  try {
    const data = await prisma.recipe.findMany({
      include: {
        user: true,
      },
    });

    res.json({ data });
  } catch (error) {
    console.error("[ERROR] getAll: ", { error });
    res.json({ error });
  }
};

const createOneRecipe = async (req, res) => {
  try {
    const newRecipe = await prisma.recipe.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        prepTime: req.body.prepTime,
        cookingTime: req.body.cookingTime,
        user: {
          connect: { id: req.body.userId },
        },
        ingredients: {
          create: req.body.ingredients,
        },
      },
      include: {
        ingredients: true,
      },
    });
    res.json({ data: newRecipe });
  } catch (error) {
    console.error("[ERROR] createOneRecipe: ", { error });
    res.json({ error });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const updateRecipe = await prisma.recipe.update({
      data: {
        title: req.body.title,
        description: req.body.description,
        prepTime: req.body.prepTime,
        cookingTime: req.body.cookingTime,
        user: req.body.userId,
        ingredients: {
          create: req.body.ingredients,
        },
      },
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.json({ data: updateRecipe });
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
};

const getOneRecipe = async (req, res) => {
  const targetId = parseInt(req.params.id);
  try {
    const recipeData = await prisma.recipe.findFirst({
      where: {
        id: targetId,
      },
    });

    res.json(recipeData);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAll, createOneRecipe, updateRecipe, getOneRecipe };
