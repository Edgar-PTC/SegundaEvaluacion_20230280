import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcrypts from "bcryptjs"

import pacientesModel from "../models/pacientesModel.js";
import htmlRegister from "../utils/htmlRegister.js";

import { config } from "../config.js"
import { text } from "stream/consumers";
import { error } from "console";

const registerPacientesController = {};

registerPacientesController.insert = async(req, res) => {
    try {
        let { name, lastName, email, password, birthDate, phone, address, bloodType, phoneEmergencyContacts } = req.body;
        
        name: name?.trim();
        lastName: lastName?.trim();
        email: email?.trim();
        password: password?.trim();
        phone: phone?.trim();
        address: address?.trim();
        bloodType: bloodType?.trim();

        const exist = await pacientesModel.findOne({ email });
        if(exist){
            return res.status(400).json({ "message": "Email esta usado" });
        }

        const passwordHash = await bcrypts.hash(password, 10);

        const newUser = pacientesModel({
            name, lastName, email, password: passwordHash, birthDate, phone, address, bloodType, profilePhoto: req.file.path, profilePhoto_publicId: req.file.filename, isVerified: false, loginAttempts: 0, timeOut: null
        });

        await newUser.save();

        const verificationCode = crypto.randomBytes(3).toString("hex");

        const tokenCode = jsonwebtoken.sign(
            {email, verificationCode},
            config.jwt.secret,
            {expiresIn: "15m"}
        );

        res.cookie("verificationTokenCookie", tokenCode, {maxAge: 15 * 60 * 1000});

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
            subject: "Verificar cuenta.",
            html: htmlRegister(email, verificationCode)
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

registerPacientesController.verifyCode = async(req, res) => {
    try {
        const { verificationCodeRequest } = req.body;

        const token = req.cookies.verificationTokenCookie;

        const decoded = jsonwebtoken.verify(token, config.jwt.secret);
        const { email, verificationCode } = decoded;

        if(verificationCode !== verificationCodeRequest){
            return res.status(400).json({ "message": "Correo incorrecto" });
        }

        const user = await pacientesModel.findOne({ email })
        user.isVerified = true;
        await user.save();

        res.clearCookie("verificationTokenCookie");

        return res.status(200).json({ "message": "Correo verificado" });
    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({ "Error": error });
    }
}

export default registerPacientesController;