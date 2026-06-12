/*
    specialtyName
    description
    isAvailable
*/

import { Schema, model } from "mongoose"

const especialidadesMedicasModel = new Schema({
    "specialtyName": {
        type: String
    },
    "description": {
        type: String
    },
    "isAvailable": {
        type: Boolean
    }
})

export default model("EspecialidadesMedicas", especialidadesMedicasModel);