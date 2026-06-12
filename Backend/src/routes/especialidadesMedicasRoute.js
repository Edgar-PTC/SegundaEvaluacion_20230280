import e from "express";
import especialidadesMedicasController from "../controller/especialidadesMedicasController.js"

const especialidadesMedicasRouter = e.Router();

especialidadesMedicasRouter.route("/")
.get(especialidadesMedicasController.getAll)
.post(especialidadesMedicasController.insert)

especialidadesMedicasRouter.route("/:id")
.delete(especialidadesMedicasController.delete)
.put(especialidadesMedicasController.update)

export default especialidadesMedicasRouter;