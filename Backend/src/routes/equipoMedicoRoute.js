import e from "express";
import equipoMedicoController from "../controller/equipoMedicoController.js"
import upload from "../utils/cloudinaryConfig.js"

const equipoMedicoRouter = e.Router();

equipoMedicoRouter.route("/")
.get(equipoMedicoController.getAll)
.post(upload.single("image"), equipoMedicoController.insert)

equipoMedicoRouter.route("/:id")
.delete(equipoMedicoController.delete)
.put(upload.single("image"), equipoMedicoController.update)

export default equipoMedicoRouter;