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
    const deletedProfile = await prisma.user.delete({
      where: {
        id: targetId,
      },
    });

    res.json({
      message: `User with id:${targetId} has been deleted successfully!`,
    });
  } catch (error) {
    console.error({ error: error.message });

    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  console.log({ params: req.params, body: req.body });
  try {
    const userProfileToUpdate = await prisma.user.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        userName: req.body.userName,
        email: req.body.email,
      },
    });
    res.json({ data: userProfileToUpdate });
  } catch (error) {
    console.error("[ERROR] updateUserProfile: ", { error });
    res.json({ error });
  }
};

const updateprofile = async (req, res) => {
  console.log({ params: req.params, body: req.body });
  try {
    const userProfileToUpdate = await prisma.profile.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
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
        id: targetId,
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
  updateUser,
  getUserWithRecipes,
  updateprofile,
};
