const { Task, User } = require("../../../../db/models/relationShips");


const allTaskCompleted = async (req, res) => {
    const { id_user } = req.query;
    try {
        // Busco todas las tareas del usuario
        const allTaskOfUser = await User.findByPk(id_user, {
            include: [{ model: Task }],
        });

        const taskCompleted = allTaskOfUser.tasks.filter((task) => task.is_completed)

        if (!taskCompleted || taskCompleted.length === 0) return res.status(404).json({ status: 404, error:"No tasks completed"})

        res.status(200).json({ status: 200, message: "Tasks completed", data: taskCompleted });
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
};

module.exports = allTaskCompleted;