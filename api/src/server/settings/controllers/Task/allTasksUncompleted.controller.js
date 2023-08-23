const { Task, User } = require("../../../../db/models/relationShips");


const allTaskUncompleted = async (req, res) => {
    const { id_user } = req.query;
    try {
        // Busco todas las tareas del usuario
        const allTaskOfUser = await User.findByPk(id_user, {
            include: [{ model: Task }],
        });

        const taskUncompleted = allTaskOfUser.tasks.filter((task) => !task.is_completed)
        if (!taskUncompleted || taskUncompleted.length === 0) return res.status(404).json({ status: 404, error: "No uncompleted tasks" })
        
        res.status(200).json({ status: 200, message: "Tasks not completed", data: taskUncompleted });
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
};

module.exports = allTaskUncompleted;