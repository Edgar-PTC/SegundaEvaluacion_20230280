import citasMedicasModel from "../models/citasMedicasModel.js"

const citasMedicasController = {};

citasMedicasController.getAll = async (req, res) => {
    try {
        const pacientes = await citasMedicasModel.find();
        return res.status(200).json(pacientes);
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({ "Error": error });
    }
}

citasMedicasController.insert = async (req, res) => {
    try {
        const { patient_id, specialty_id, appointmentDate, reason, status, observations } = req.body;
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({ "Error": error });
    }
}
citasMedicasController.update = async (req, res) => {
    try {
        
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({ "Error": error });
    }
}
citasMedicasController.delete = async (req, res) => {
    try {
        
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({ "Error": error });
    }
}

export default citasMedicasController;