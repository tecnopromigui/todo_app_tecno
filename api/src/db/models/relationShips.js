const User = require("./User.model");
const Task = require("./Task.model");

// User to Task
User.belongsToMany(Task, { through:"user_task"});
Task.belongsToMany(User, { through: "user_task" });


module.exports = {
    User,
    Task
}