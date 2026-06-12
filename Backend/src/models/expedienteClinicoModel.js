/*
    patient_id
    diagnosis
    medications [{ medicineName }]
    medicalNotes
*/

import { Schema, model } from "mongoose"
import pacientesModel from "./pacientesModel";

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