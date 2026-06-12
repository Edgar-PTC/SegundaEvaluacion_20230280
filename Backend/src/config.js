import dotenv from "dotenv"

dotenv.config();

export const config = {
    db: {
        url: process.env.DB_URL
    },
    server: {
        port: process.env.PORT
    },
    jwt: {
        secret: process.env.JWT_SECRET_KEY
    },
    email: {
        user_email: process.env.USER_EMAIL,
        user_password: process.env.USER_PASSWORD
    },
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    }
}