const { Task } = require("../../../../db/models/relationShips");

//Function that checks if the id has a UUID structure.
function esUUID(id) {
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidPattern.test(id);
}

const validateTask = async (req, res, next) => {
    const { id_task } = req.params;
    try {
        //Valid if the id is correct
        if (id_task === "") return res.status(400).json({ status: 400, error: "The id field is empty!" });
        if (!esUUID(id_task)) return res.status(409).json({ status: 409, error: "The id field has no UUID structure!" });

        //Valid if the seller exists
        const task = await Task.findByPk(id_task);
        if (!task) return res.status(404).json({ status: 404, error: "The task does not exist" });

        next();

    } catch (error) {
        res.status(500).json({ status: 500, error: error.message })
    }
}

module.exports = { validateTask }