const { User } = require("../../../../db/models/relationShips");

const getUserById = async (req, res) => {
    const { id_user } = req.params;
    try {
        const user = await User.findAll(id_user);
        if (!user) return res.status(404).json({ status: 404, error: "The user does not exist" });
        res.status(200).json({ status: 200, message: "User found", data: user });
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message })
    }
}


module.exports = getUserById;