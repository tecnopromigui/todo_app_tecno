const { Router } = require("express");
const {validateUser}=require("../middleware/User/ValidateUser.middleware");
// const createUser = require("../controllers/user/createUser.controller");
// const allUsers = require("../controllers/user/allUsers.controller");

const registerUser = require("../controllers/User/registerUser.controller");
const login = require("../controllers/User/login.controller");
const confimarToken = require("../controllers/User/confimarToken.controller");
const googleLogin = require("../controllers/User/googleLogin.controller");
const olvidatePassword = require("../controllers/User/olvidatePassword.controller");
const comprobarToken = require("../controllers/User/comprobarToken.controller");
const newPasswordUser = require("../controllers/User/newPasswordUser.controller");
const getAllUser = require("../controllers/User/getAllUser.controller");
const getUserById = require("../controllers/User/getUserById.controller");

const userRouter = Router();

// userRouter.post("/create", createUser)
// userRouter.get("/search_all", allUsers);

//Para despues

userRouter.post("/register", registerUser);

userRouter.post("/login", login);

userRouter.get("/confirmar/:token", confimarToken);

userRouter.post("/google/login", googleLogin);

userRouter.get("/google/login_success", googleLogin);

userRouter.post("/olvidate_password", olvidatePassword);

userRouter.route("/olvidate_password/:token").get(comprobarToken).post(newPasswordUser);

userRouter.get("/", getAllUser);

userRouter.get("/:id_user", validateUser, getUserById);


module.exports = userRouter;