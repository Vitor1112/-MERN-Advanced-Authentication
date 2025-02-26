import express from "express";
import { connectDB } from "./db/connectDB.js";
import dotenv from 'dotenv';
import router from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

dotenv.config();
const PORT = process.env.PORT || 3000;


const app = express();
const __dirname = path.resolve();

app.use(cors({origin:"http://localhost:5173",credentials:true}))// 🔥 Permite requisições de qualquer origem
app.use(express.json());
app.use(cookieParser());// ele ajuda a ler os cookies recebidos
//O cookie-parser é um middleware que extrai os cookies do cabeçalho da requisição (req.headers.cookie) e os transforma em um objeto JavaScript acessível dentro de req.cookies.


app.use(router)

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port http://localhost:${PORT}`);
});


