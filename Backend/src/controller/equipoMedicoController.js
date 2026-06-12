import equipoMedicoModel from "../models/equipoMedicoModel.js"
import { v2 as cloudinary } from "cloudinary"

const equipoMedicoController = {};

equipoMedicoController.getAll = async (req, res) => {
    try {
        const get = await equipoMedicoModel.find();
        return res.status(200).json(get);
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({ "Error": error });
    }
}

equipoMedicoController.insert = async (req, res) => {
    try {
        let { equipmentName, description, brand, modelEquip, purchaseDate, maintenanceDate, condition, status } = req.body;

        equipmentName = equipmentName?.trim();
        description = description?.trim();
        brand = brand?.trim();
        modelEquip = modelEquip?.trim();
        condition =  condition?.trim();

        const newEquipo = equipoMedicoModel({ equipmentName, description, brand, modelEquip, purchaseDate, maintenanceDate, condition, image: req.file.path, image_publicId: req.file.filename, status, isAvailable: true });

        await newEquipo.save();
        
        return res.status(200).json({ "message": "Equipo registrado" });
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({ "Error": error });
    }
}
equipoMedicoController.delete = async (req, res) => {
    try {
        const deleted = await equipoMedicoModel.findByIdAndDelete(req.params.id);
        if(!deleted){
            return res.status(400).json({ "message": "Equipo no encontrado" });
        }
        return res.status(200).json({ "message": "Equipo eliminado" });
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({ "Error": error });
    }
}
equipoMedicoController.update = async (req, res) => {
    try {
        let { equipmentName, description, brand, modelEquip, purchaseDate, maintenanceDate, condition, status, isAvailable } = req.body;

        equipmentName = equipmentName?.trim();
        description = description?.trim();
        brand = brand?.trim();
        modelEquip = modelEquip?.trim();
        condition =  condition?.trim();

        const equipoFound = await equipoMedicoModel.findById(req.params.id);
        if(!equipoFound){
            return res.status(200).json({ "message": "Equipo no encontrado" });
        }

        equipoFound.equipmentName = equipmentName ? equipmentName : equipoFound.equipmentName;
        equipoFound.description = description ? description : equipoFound.description;
        equipoFound.brand = brand ? brand : equipoFound.brand;
        equipoFound.modelEquip = modelEquip ? modelEquip : equipoFound.modelEquip;
        equipoFound.purchaseDate = purchaseDate ? purchaseDate : equipoFound.purchaseDate;
        equipoFound.maintenanceDate = maintenanceDate ? maintenanceDate : equipoFound.maintenanceDate;
        equipoFound.condition = condition ? condition : equipoFound.condition;
        equipoFound.status = status || equipoFound.status;
        equipoFound.isAvailable = isAvailable || equipoFound.isAvailable;

        if(req.file){
            await cloudinary.uploader.destroy(equipoFound.image_publicId);
            equipoFound.image = req.file.path;
            equipoFound.image_publicId = req.file.filename;
        }
            
        await equipoFound.save();
        
        return res.status(200).json({ "message": "Equipo modificado" });
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({ "Error": error });
    }
}

export default equipoMedicoController;