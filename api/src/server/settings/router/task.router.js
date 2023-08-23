const { Router } = require("express");
const { validateTask } = require("../middleware/Task/ValidateTask.middleware");
const { validateUser } = require("../middleware/User/ValidateUser.middleware");
const createTask = require("../controllers/Task/createTask.controller");
const allTasks = require("../controllers/Task/allTasks.controller");
const updateTask = require("../controllers/Task/updateTask.controller");
const deleteTask = require("../controllers/Task/deleteTask.controller");
const allTaskCompleted = require("../controllers/Task/allTasksCompleted.controller");
const allTaskUncompleted = require("../controllers/Task/allTasksUncompleted.controller");

const taskRouter = Router();

taskRouter.post("/create", validateUser, createTask)
taskRouter.get("/search_all", validateUser, allTasks);
taskRouter.get("/search_completed", validateUser, allTaskCompleted);
taskRouter.get("/search_incompleted", validateUser, allTaskUncompleted);
taskRouter.put("/update/:id_task", validateUser, validateTask, updateTask);
taskRouter.delete("/delete/:id_task", validateUser, validateTask, deleteTask);

module.exports = taskRouter;