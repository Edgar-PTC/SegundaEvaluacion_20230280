import e from "express";
import citasMedicasController from "../controller/citasMedicasController.js"

const citasMedicasRouter = e.Router();

citasMedicasRouter.route("/")
.get(citasMedicasController.getAll)
.post(citasMedicasController.insert)

citasMedicasRouter.route("/:id")
.delete(citasMedicasController.delete)
.put(citasMedicasController.update)

export default citasMedicasRouter;