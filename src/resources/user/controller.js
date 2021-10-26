const prisma = require("../../utils/database")

const createUserProfile = async (req, res) => {
    console.log(req.body)
    try {
        const newUser = await prisma.user.create({
            data: {
                userName: req.body.userName,
                email: req.body.email,
                profile: {
                    create: {
                        firstName: req.body.profile.firstName,
                        lastName: req.body.profile.lastName,
                    }
                },
            },
            include: {
                profile: true,
            }
        })
        res.json({ data: newUser })
        console.log(newUser)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error })
    }
}

const getAll = async (req, res) => {
    try {
        const getAllUsers = await prisma.user.findMany()

        res.json({ data: getAllUsers })
        console.log(getAllUsers)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error })
    }
}

module.exports = { createUserProfile, getAll }