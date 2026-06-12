import e from "express";
import equipoMedicoController from "../controller/equipoMedicoController.js"

const equipoMedicoRouter = e.Router();

equipoMedicoRouter.route("/")
.get(equipoMedicoController.getAll)
.post(equipoMedicoController.insert)

equipoMedicoRouter.route("/:id")
.delete(equipoMedicoController.delete)
.put(equipoMedicoController.update)

export default equipoMedicoRouter;