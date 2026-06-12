import equipoMedicoModel from "../models/equipoMedicoModel.js"

const equipoMedicoController = {};

equipoMedicoController.getAll = async (req, res) => {
    try {
        const get = await equipoMedicoModel.find();
        return req.status(200).json(get);
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({ "Error": error });
    }
}

equipoMedicoController.insert = async (req, res) => {
    try {
        let { equipmentName, description, brand, model, purchaseDate, maintenanceDate, condition, image, status } = req.body;


    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({ "Error": error });
    }
}
equipoMedicoController.delete = async (req, res) => {
    try {
        const deleted = await equipoMedicoModel.findByIdAndDelete(req.params.id);
        if(!deleted){
            return res.status(400).json({ "message": "Equipo no encontrado" });
        }
        return res.status(200).json({ "message": "Equipo eliminado" });
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({ "Error": error });
    }
}
equipoMedicoController.update = async (req, res) => {
    try {
        
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({ "Error": error });
    }
}

export default equipoMedicoController;