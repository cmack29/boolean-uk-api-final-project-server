const prisma = require("../../utils/database");

const createUserProfile = async (req, res) => {
  console.log(req.body);
  try {
    const newUser = await prisma.user.create({
      data: {
        userName: req.body.userName,
        email: req.body.email,
        profile: {
          create: {
            firstName: req.body.profile.firstName,
            lastName: req.body.profile.lastName,
          },
        },
      },
      include: {
        profile: true,
        recipes: true,
      },
    });
    res.json({ data: newUser });
    console.log(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

const getAll = async (req, res) => {
  try {
    const getAllUsers = await prisma.user.findMany({
      include: {
        profile: true,
        recipes: true,
      },
    });

    res.json({ data: getAllUsers });
    console.log(getAllUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

const deleteUserProfile = async (req, res) => {
  const targetId = parseInt(req.params.id);

  try {
    const deleteRecipes = prisma.recipe.deleteMany({
      where: {
        userId: targetId,
      },
    });

    const deleteProfile = prisma.profile.delete({
      where: {
        userId: targetId,
      },
    });

    const deleteUser = prisma.user.delete({
      where: {
        id: targetId,
      },
    });
    /*
     Reference to prisma.$transaction: https://www.prisma.io/docs/guides/performance-and-optimization/prisma-client-transactions-guide#transaction-api
    */
    await prisma.$transaction([deleteRecipes, deleteProfile, deleteUser]);

    res.json({
      message: `User with id:${targetId} has been deleted successfully!`,
    });
  } catch (error) {
    console.error({ error: error.message });

    res.status(500).json({ error: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  console.log({ params: req.params, body: req.body });
  try {
    const updatedProfile = await prisma.profile.upsert({
      where: {
        userId: parseInt(req.params.id),
      },
      update: {
        firstName: req.body.profile.firstName,
        lastName: req.body.profile.lastName,
      },
      create: {
        firstName: req.body.profile.firstName,
        lastName: req.body.profile.lastName,
        user: {
          connect: {
            id: parseInt(req.params.id),
          },
        },
      },
    });

    console.log("UpdatedProfile: ", updatedProfile);

    const userProfileToUpdate = await prisma.user.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        userName: req.body.userName,
        email: req.body.email,
      },
      include: {
        profile: true,
        recipes: true,
      },
    });

    res.json({ data: userProfileToUpdate });
  } catch (error) {
    console.error("[ERROR] updateUserProfile: ", { error });
    res.json({ error });
  }
};

const getUserWithRecipes = async (req, res) => {
  const targetId = parseInt(req.params.id);

  try {
    const data = await prisma.user.findFirst({
      where: {
        userId: targetId,
      },
      include: {
        recipes: true,
      },
    });
    res.json(data);
  } catch (error) {
    console.error({ error: error.message });

    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUserProfile,
  getAll,
  deleteUserProfile,
  getUserWithRecipes,
  updateUserProfile,
};
