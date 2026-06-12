import especialidadesMedicasModel from "../models/especialidadesMedicasModel.js"

const especialidadesMedicasController = {};

especialidadesMedicasController.getAll = async (req, res) => {
    try {
        const get = await especialidadesMedicasModel.find();
        return res.status(200).json(get);
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({ "Error": error });
    }
}

especialidadesMedicasController.insert = async (req, res) => {
    try {
        let { specialtyName, description } = req.body;

        specialtyName = specialtyName?.trim();
        description = description?.trim();

        const newEspecialidad = especialidadesMedicasModel({ specialtyName, description, isAvailable: true });

        await newEspecialidad.save();

        return res.status(200).json({ "message": "Especialidad guardada" });
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({ "Error": error });
    }
}
especialidadesMedicasController.delete = async (req, res) => {
    try {
        const deleted = await especialidadesMedicasModel.findByIdAndDelete(req.params.id);
        if(!deleted){
            return res.status(400).json({ "message": "Especialidad no encontrada" });
        }
        return res.status(200).json({ "message": "especialidad eliminada" });
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({ "Error": error });
    }
}
especialidadesMedicasController.update = async (req, res) => {
    try {
        let { specialtyName, description, isAvailable } = req.body;

        specialtyName = specialtyName?.trim();
        description = description?.trim();

        const exist = await especialidadesMedicasModel.findById(req.params.id);
        if(!exist){
            return res.status(400).json({ "message": "Especialidad no encontrada" });
        }

        exist.specialtyName = specialtyName ? specialtyName : exist.specialtyName;
        exist.description = description ? description : exist.description;
        exist.isAvailable = isAvailable || true;

        exist.save();

        return res.status(200).json({ "message": "Especialidad modificada" });
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({ "Error": error });
    }
}

export default especialidadesMedicasController;