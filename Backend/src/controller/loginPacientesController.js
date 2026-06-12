import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken"

import pacientesModel from "../models/pacientesModel.js";

import { config } from "../config.js";

const loginPacientesController = {}

loginPacientesController.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userFound = await pacientesModel.findOne({ email });
        if(!userFound){
            return res.status(400).json({ "message": "Correo no encontrado" });
        }

        if(userFound. timeOut && userFound.timeOut > Date.now()){
            return res.status(400).json({ "message": "Correo bloqueado" });
        }

        const isMatch = await bcrypt.compare(password, userFound.password);

        if(!isMatch){
            userFound.loginAttempts = (userFound.loginAttempts || 0) + 1;

            if(userFound.loginAttempts >= 5){
                userFound.timeOut = Date.now() + 5 * 60 * 1000;
                userFound.loginAttempts = 0;
                await userFound.save();
                return res.status(400).json({ "message": "Demasiado intentos" });
            }

            await userFound.save();
            return res.status(400).json({ "message": "Contraseña incorrecta" });
        }

        userFound.loginAttempts = 0;
        userFound.timeOut = null;
        await userFound.save();

        const token = jsonwebtoken.sign(
            {id: userFound._id},
            config.jwt.secret,
            {expiresIn: "30d"}
        )

        res.cookie("authCookie", token);

        return res.status(200).json({ "message": "Bienvenido" });
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({ "Error": error });
    }
}

export default loginPacientesController;