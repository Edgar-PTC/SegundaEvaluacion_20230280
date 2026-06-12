/*
    patient_id
    specialty_id
    appointmentDate
    reason
    status
    observations
*/

import mongoose, { Schema, model } from "mongoose"
import pacientesModel from "./pacientesModel.js";
import especialidadesMedicasModel from "./especialidadesMedicasModel.js";

const citasMedicasModel = new Schema({
    "patient_id": {
        type: mongoose.Schema.Types.ObjectId,
        ref: pacientesModel
    },
    "specialty_id": {
        type: mongoose.Schema.Types.ObjectId,
        ref: especialidadesMedicasModel
    },
    "appointmentDate": {
        type: Date
    },
    "reason": {
        type: String
    },
    "status": {
        type: Boolean
    },
    "observations": {
        type: String
    },
})

export default model("CitasMedicas", citasMedicasModel);