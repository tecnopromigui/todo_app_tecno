const {User} = require("../../../../db/models/relationShips");

const allUsers = async (req, res) => {

    try {
        const userSearch = await User.findAll();
        if (!userSearch || userSearch.length === 0) return res.status(400).json("No hay usuarios cargados");

        res.status(201).json(userSearch);
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
}

module.exports = allUsers;