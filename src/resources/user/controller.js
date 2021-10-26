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

module.exports = { createUserProfile };
