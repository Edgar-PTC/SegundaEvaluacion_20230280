import e from "express";
import registerPacientesController from "../controller/registerPacientesController.js"
import upload from "../utils/cloudinaryConfig.js"

const registerPacientesRouter = e.Router();

registerPacientesRouter.route("/")
.post(upload.single("profilePhoto"), registerPacientesController.insert)

registerPacientesRouter.route("/verifyCode")
.post(registerPacientesController.verifyCode)

export default registerPacientesRouter;