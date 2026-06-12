/*
    equipmentName
    description
    brand
    model
    purchaseDate
    maintenanceDate
    condition
    image
    status
    isAvailable
*/

import { Schema, model } from "mongoose"

const equipoMedicoModel = new Schema({
    "equipmentName": {
        type: String
    },
    "description": {
        type: String
    },
    "brand": {
        type: String
    },
    "modelEquip": {
        type: String
    },
    "purchaseDate": {
        type: Date
    },
    "maintenanceDate": {
        type: Date
    },
    "condition": {
        type: String
    },
    "image": {
        type: String
    },
    "image_publicId": {
        type: String
    },
    "status": {
        type: Boolean
    },
    "isAvailable": {
        type: Boolean
    },
})

export default model("EquipoMedico", equipoMedicoModel);