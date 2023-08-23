const { Task, User } = require("../../../../db/models/relationShips");


const createTask = async (req, res) => {
    const { id_user } = req.query;
    const { task } = req.body;
    console.log(task)
    try {
        // Verifico que la tarea exista
        if (!task || task == "") return res.status(400).json({ status: 400, error: "Does not contain the task" })
        // Como ya posó por el middlware tengo la certesa de que el Usuario ya existe
        const user = await User.findByPk(id_user);
        // Busco todas las tareas del usuario
        const allTaskOfUser = await User.findByPk(id_user, {
            include: [{ model: Task }],
        });

        if(allTaskOfUser.tasks.length !== 0){
            let bandera = false;
            for (let i = 0; i < allTaskOfUser.tasks.length; i++) {
                if (task.toLowerCase() === allTaskOfUser.tasks[i].task.toLowerCase()) {
                    bandera = true;
                    i = allTaskOfUser.tasks.length;
                }
            }
            if (bandera) return res.status(409).json({ status: 409, error: "The task has already been added" });
        }

        const newTask = await Task.create({ task });

        await user.addTask(newTask);

        res.status(201).json({ status: 201, message: "The task was successfully created", data: newTask });
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
};

module.exports = createTask;