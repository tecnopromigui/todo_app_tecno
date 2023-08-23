const { User } = require("../../../../db/models/relationShips");

//Function that checks if the id has a UUID structure.
function esUUID(id) {
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidPattern.test(id);
}

const validateUser = async (req, res, next) => {
    const {id_user} = req.query;
    try {
        //Valid if the id comes from the query
        if (Object.keys(req.query).length === 0) return res.status(400).json({ status: 400, error: "The id field is required!" });

        //Valid if the id is correct
        if (id_user === "") return res.status(400).json({ status: 400, error: "The id field is empty!" });
        if (!esUUID(id_user)) return res.status(409).json({ status: 409, error: "The id field has no UUID structure!" });

        //Valid if the seller exists
        const user = await User.findByPk(id_user);
        if (!user) return res.status(404).json({ status: 404, error: "The user does not exist" });

        next();

    } catch (error) {
        res.status(500).json({ status: 500, error: error.message })
    }
}

module.exports = { validateUser }