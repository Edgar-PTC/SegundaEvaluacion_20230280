/*
    name
    lastName
    email
    password
    birthDate
    phone
    address
    bloodType
    phoneEmergencyContacts [{ phone, nameEmergencyContact }]
    profilePhoto
    isVerified
    loginAttempts
    timeOut
*/

import { Schema, model } from "mongoose"

const pacientesModel = new Schema({
    "name": {
        type: String
    },
    "lastName": {
        type: String
    },
    "email": {
        type: String
    },
    "password": {
        type: String
    },
    "birthDate": {
        type: Date
    },
    "phone": {
        type: String
    },
    "address": {
        type: String
    },
    "bloodType": {
        type: String
    },
    //"phoneEmergencyContacts" [{ phone, nameEmergencyContact }]
    "profilePhoto": {
        type: String
    },
    "profilePhoto_publicId": {
        type: String
    },
    "isVerified": {
        type: String
    },
    "loginAttempts": {
        type: String
    },
    "timeOut": {
        type: String
    },
})

export default model("Pacientes", pacientesModel);