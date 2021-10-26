const prisma = require("../../utils/database");

const createUserProfile = async (req, res) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        userName: req.body.userName,
        email: req.body.email,
      },
      profile: {
        create: [
          {
            ...req.body.profile,
          },
        ],
      },
      include: {
        profile: true,
      },
    });
    res.json({ data: newUser });
    console.log(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

const deleteUserProfile = async (req, res) => {
  const targetId = parseInt(req.params.id);

  try {
    const deletedProfile = await prisma.profile.delete({
      where: {
        userId: targetId,
      },
    });

    res.json({
      message: `Profile of user with id:${targetId} has been deleted successfully!`,
    });
  } catch (error) {
    console.error({ error: error.message });

    res.status(500).json({ error: error.message });
  }
};

module.exports = { createUserProfile, deleteUserProfile };
