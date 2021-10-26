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

const createOneRecipe = async (req, res) => {
  console.log({ body: req.body.ingredients.name });
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
          create: [
            {
              name: req.body.ingredients.name,
            },
          ],
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

module.exports = { getAll, createOneRecipe };
