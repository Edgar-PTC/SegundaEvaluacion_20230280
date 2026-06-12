import e from "express";
import pacientesController from "../controller/pacientesController.js"
import upload from "../utils/cloudinaryConfig.js"

const pacientesRouter = e.Router();

pacientesRouter.route("/")
.get(pacientesController.getAll)

pacientesRouter.route("/:id")
.delete(pacientesController.delete)
.put(upload.single("profilePhoto"), pacientesController.update)

export default pacientesRouter;