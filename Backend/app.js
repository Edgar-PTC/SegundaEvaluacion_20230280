import e from "express";

import cookieParser from "cookie-parser";
import cors from "cors";

const app = e();

app.use(cors({
    credentials: true
}))

app.use(cookieParser());

app.use(e.json());

//Endpoints


export default app;