import e from "express";
import loginPacientesController from "../controller/loginPacientesController.js"

const loginPacientesRouter = e.Router();

loginPacientesRouter.route("/")
.post(loginPacientesController.login)

export default loginPacientesRouter;