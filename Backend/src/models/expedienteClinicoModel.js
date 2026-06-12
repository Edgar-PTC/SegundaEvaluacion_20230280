/*
    patient_id
    diagnosis
    medications [{ medicineName }]
    medicalNotes
*/

import { mongoose, Schema, model } from "mongoose"
import pacientesModel from "./pacientesModel.js";

const expedienteClinicoModel = new Schema({
    "patient_id": {
        type: mongoose.Schema.Types.ObjectId,
        ref: pacientesModel
    },
    "diagnosis": {
        type: String
    },
    "medications": [
        {
            medicineName: {
                type: String
            }
        }
    ],
    "medicalNotes": {
        type: String
    },
})

export default model("ExpedienteClinico", expedienteClinicoModel);