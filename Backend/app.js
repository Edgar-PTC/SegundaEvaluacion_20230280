import e from "express";
//Importar Routes.js
import citasMedicasRouter from "./src/routes/citasMedicasRoute.js";
import equipoMedicoRouter from "./src/routes/equipoMedicoRoute.js";
import registerPacientesRouter from "./src/routes/registerPacientesRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = e();

app.use(cors({
    credentials: true
}))

app.use(cookieParser());

app.use(e.json());

//Endpoints
app.use("/api/citasMedicas", citasMedicasRouter);
app.use("/api/registerPacientes", registerPacientesRouter);

export default app;