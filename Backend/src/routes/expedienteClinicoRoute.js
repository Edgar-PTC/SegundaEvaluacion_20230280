import e from "express";
import expedienteClinicoController from "../controller/expedienteClinicoController.js"

const expedienteClinicoRouter = e.Router();

expedienteClinicoRouter.route("/")
.get(expedienteClinicoController.getAll)
.post(expedienteClinicoController.insert)

expedienteClinicoRouter.route("/:id")
.delete(expedienteClinicoController.delete)
.put(expedienteClinicoController.update)

export default expedienteClinicoRouter;