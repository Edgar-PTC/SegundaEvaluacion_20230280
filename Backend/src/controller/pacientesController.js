import pacientesModel  from "../models/pacientesModel.js"
import { v2 as cloudinary } from "cloudinary"

const pacientesController = {};

pacientesController.getAll = async (req, res) => {
    try {
        const pacientes = await pacientesModel.find();
        return res.status(200).json(pacientes);
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({ "Error": error });
    }
}

pacientesController.delete = async (req, res) => {
    try {
        const deleted = await pacientesModel.findByIdAndDelete(req.params.id);
        if(!deleted){
            return res.status(400).json({ "message": "Id no existente" });
        }
        return res.status(200).json({ "message": "Paciente eliminado" });
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({ "Error": error });
    }
}

pacientesController.update = async (req, res) => {
    try {
        let { name, lastName, email, birthDate, phone, address, bloodType, phoneEmergencyContacts } = req.body;
        
        name: name?.trim();
        lastName: lastName?.trim();
        email: email?.trim();
        phone: phone?.trim();
        address: address?.trim();
        bloodType: bloodType?.trim();

        const found = await pacientesModel.findById(req.params.id);

        found.name = name ? name : found.name;
        found.lastName = lastName ? lastName : found.lastName;
        found.email = email ? email : found.email;
        found.phone = phone ? phone : found.phone;
        found.address = address ? address : found.address;
        found.bloodType = bloodType ? bloodType : found.bloodType;
        found.birthDate = birthDate ? birthDate : found.birthDate;
        //found.phoneEmergencyContacts = phoneEmergencyContacts ? phoneEmergencyContacts : found.phoneEmergencyContacts

        if(req.file){
            await cloudinary.uploader.destroy(found.profilePhoto_publicId);
            found.profilePhoto = req.file.path;
            found.profilePhoto_publicId = req.file.filename;
        }

        await found.save()

        return res.status(200).json({ "message": "Paciente modificado" });
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({ "Error": error });
    }
}

export default pacientesController;