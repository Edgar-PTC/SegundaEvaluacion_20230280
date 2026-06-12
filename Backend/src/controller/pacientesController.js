import pacientesModel  from "../models/pacientesModel.js"

const pacientesController = {};

pacientesController.getAll = async (req, res) => {
    try {
        const pacientes = await pacientesModel.find();
        return res.status(200).json(pacientes);
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({ "Error": error });
    }
}

pacientesController.delete = async (req, res) => {
    try {
        const deleted = await pacientesModel.findByIdAndDelete(req.params.id);
        if(!deleted){
            return res.status(400).json({ "message": "Id no existente" });
        }
        return res.status(200).json({ "message": "Paciente eliminado" });
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({ "Error": error });
    }
}

pacientesController.update = async (req, res) => {
    try {
        
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({ "Error": error });
    }
}

export default pacientesController;