const {User} = require("../../../../db/models/relationShips");

const createUser = async (req, res) => {
    const { firts_name, last_name, email, password } = req.body;
    try {
        const userSearch = await User.findOne({ where: { email: email } });
        if (userSearch) return res.status(400).json("Email already exists");
        const user = await User.create({
            firts_name,
            last_name,
            email,
            password
        })
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
}

module.exports = createUser;