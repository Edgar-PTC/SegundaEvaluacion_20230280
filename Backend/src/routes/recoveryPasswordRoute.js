import e from "express";
import recoveryPasswordController from "../controller/recoveryPasswordController.js"

const recoveryPasswordRouter = e.Router();

recoveryPasswordRouter.route("/requestCode")
.post(recoveryPasswordController.requestCode)

recoveryPasswordRouter.route("/verifyCode")
.post(recoveryPasswordController.verifyCode)

recoveryPasswordRouter.route("/newPassword")
.post(recoveryPasswordController.newPassword)

export default recoveryPasswordRouter;