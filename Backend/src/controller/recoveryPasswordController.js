import nodemailer from "nodemailer"
import crypto, { verify } from "crypto"
import jsonwebtoken from "jsonwebtoken"
import bcrypt from "bcryptjs"

import pacientesModel from "../models/pacientesModel.js"
import htmlRecovery from "../utils/htmlRecovery.js"

import { config } from "../config.js"

const recoveryPasswordController = {}

recoveryPasswordController.requestCode = async (req, res) => {
    try {
        let { email } = req.body;
        
        email: email?.trim();
        
        const exist = await pacientesModel.findOne({ email });
        if(!exist){
            return res.status(400).json({ "message": "Email no existente" });
        }

        const recoveryCode = crypto.randomBytes(3).toString("hex");

        const tokenCode = jsonwebtoken.sign(
            {email, recoveryCode, verify: false},
            config.jwt.secret,
            {expiresIn: "15m"}
        );

        res.cookie("recoveryTokenCookie", tokenCode, {maxAge: 15 * 60 * 1000});

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                pass: config.email.user_password
            }
        });

        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Recuperar Contraseña.",
            html: htmlRecovery(email, recoveryCode)
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log("Error: " + error)
                return res.status(400).json({ "message": "Error enviando correo" });
            }
        })

        return res.status(200).json({ "message": "Correo enviado" });
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({ "Error": error });
    }
}

recoveryPasswordController.verifyCode = async (req, res) => {
    try {
        const { recoveryCodeRequest } = req.body;

        const token = req.cookies.recoveryTokenCookie;

        const decoded = jsonwebtoken.verify(token, config.jwt.secret);
        const { email, recoveryCode } = decoded;

        if(recoveryCode !== recoveryCodeRequest){
            return res.status(400).json({ "message": "Correo incorrecto" });
        }

        const tokenCode = jsonwebtoken.sign(
            {email, recoveryCode, verify: true},
            config.jwt.secret,
            {expiresIn: "15m"}
        );

        res.cookie("recoveryTokenCookie", tokenCode, {maxAge: 15 * 60 * 1000});

        return res.status(200).json({ "message": "Codigo verificado" });
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({ "Error": error });
    }
}

recoveryPasswordController.newPassword = async (req, res) => {
    try {
        const { newPassword } = req.body;

        const token = req.cookies.recoveryTokenCookie;
        const decoded = jsonwebtoken.verify(token, config.jwt.secret);

        if(!decoded.verify){
            return res.status(400).json({ "message": "Codigo no verificado" });
        }

        const passwordHash = await bcrypt.hash(newPassword, 10);

        await pacientesModel.findOneAndUpdate({email: decoded.email}, {password: passwordHash}, {new: true})

        res.clearCookie("recoveryTokenCookie");

        return res.status(200).json({ "message": "Contraseña actualizada" });
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({ "Error": error });
    }
}

export default recoveryPasswordController;