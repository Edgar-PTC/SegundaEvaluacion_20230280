import expedienteClinicoModel from "../models/expedienteClinicoModel.js"
import pacientesModel from "../models/pacientesModel.js";

const expedienteClinicoController = {};

expedienteClinicoController.getAll = async (req, res) => {
    try {
        const get = await expedienteClinicoModel.find();
        return res.status(200).json(get);
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({ "Error": error });
    }
}

expedienteClinicoController.insert = async (req, res) => {
    try {
        let { patient_id, diagnosis, medications, medicalNotes } = req.body;

        const patientFound = await pacientesModel.findById(patient_id);
        if(!patientFound){
            return res.status(400).json({ "message": "Id de paciente no existente" });
        }

        diagnosis = diagnosis?.trim();
        medications = medications? medications : [];
        medicalNotes = medicalNotes?.trim();

        const newExpediente = expedienteClinicoModel({ patient_id, diagnosis, medications, medicalNotes });

        await newExpediente.save();

        return res.status(200).json({ "message": "Expediente agregado" });
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({ "Error": error });
    }
}
expedienteClinicoController.delete = async (req, res) => {
    try {
        const deleted = await expedienteClinicoModel.findByIdAndDelete(req.params.id);
        if(!deleted){
            return res.status(400).json({ "message": "Expediente no encontrado" });
        }
        return res.status(200).json({ "message": "Expediente eliminado" });
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({ "Error": error });
    }
}
expedienteClinicoController.update = async (req, res) => {
    try {
        let { patient_id, diagnosis, medications, medicalNotes } = req.body;

        if(patient_id){
            const patientFound = await pacientesModel.findById(patient_id);
            if(!patientFound){
                return res.status(400).json({ "message": "Id de paciente no existente" });
            }
        }

        diagnosis = diagnosis?.trim();
        medications = medications? medications : [];
        medicalNotes = medicalNotes?.trim();

        const expedienteEncontrado = await expedienteClinicoModel.findById(req.params.id);

        if(!expedienteEncontrado){
            return res.status(400).json({ "message": "Expediente no encontrado" });
        }

        expedienteEncontrado.patient_id = patient_id ? patient_id : expedienteEncontrado.patient_id;
        expedienteEncontrado.diagnosis = diagnosis ? diagnosis : expedienteEncontrado.diagnosis;
        expedienteEncontrado.medications = medications != [] ? medications : expedienteEncontrado.medications;
        expedienteEncontrado.medicalNotes = medicalNotes ? medicalNotes : expedienteEncontrado.medicalNotes;

        await expedienteEncontrado.save();

        return res.status(200).json({ "message": "Expediente modificado" });
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({ "Error": error });
    }
}

export default expedienteClinicoController;