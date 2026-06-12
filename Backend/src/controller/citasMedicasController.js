import citasMedicasModel from "../models/citasMedicasModel.js"
import especialidadesMedicasModel from "../models/especialidadesMedicasModel.js";
import pacientesModel from "../models/pacientesModel.js";

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
        let { patient_id, specialty_id, appointmentDate, reason, observations } = req.body;

        patient_id = patient_id?.trim();
        specialty_id = specialty_id?.trim();
        reason = reason?.trim();
        observations = observations?.trim();

        const patientFound = await pacientesModel.findById(patient_id);
        if(!patientFound){
            return res.status(400).json({ "message": "Paciente no encontrado" });
        }

        const specialtyFound = await especialidadesMedicasModel.findById(specialty_id);
        if(!specialtyFound){
            return res.status(400).json({ "message": "Especialidad no encontrada" });
        }

        const newDate = new citasMedicasModel({ patient_id, specialty_id, appointmentDate, reason, status: true, observations });

        await newDate.save();

        return res.status(200).json({ "message": "Cita registrada" });
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({ "Error": error });
    }
}
citasMedicasController.update = async (req, res) => {
    try {
        let { patient_id, specialty_id, appointmentDate, reason, status, observations } = req.body;

        patient_id = patient_id?.trim();
        specialty_id = specialty_id?.trim();
        reason = reason?.trim();
        observations = observations?.trim();

        const patientFound = await pacientesModel.findById(patient_id);

        const specialtyFound = await especialidadesMedicasModel.findById(specialty_id);


        const foundDate = await citasMedicasModel.findById(req.params.id);
        if(!foundDate){
            return res.status(400).json({ "message": "Cita no encontrada" });
        }
        
        foundDate.patient_id = patientFound ? patient_id : foundDate.patient_id;
        foundDate.specialty_id = specialtyFound ? specialty_id : foundDate.specialty_id;
        foundDate.appointmentDate = appointmentDate ? appointmentDate : foundDate.appointmentDate;
        foundDate.reason = reason ? reason : foundDate.reason;
        foundDate.observations = observations ? observations : foundDate.observations;
        foundDate.status = status || foundDate.status;

        await foundDate.save();

        return res.status(200).json({ "message": "Cita modificada" });
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({ "Error": error });
    }
}
citasMedicasController.delete = async (req, res) => {
    try {
        const deleted = await citasMedicasModel.findByIdAndDelete(req.params.id);
        if(!deleted){
            return res.status(400).json({ "message": "Equipo no encontrado" });
        }
        return res.status(200).json({ "message": "Equipo eliminado" });
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({ "Error": error });
    }
}

export default citasMedicasController;