import express from "express";
import { login ,signup ,logout,verifyEmail,forgotPassword,resetPassword, checkAuth} from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();


 

router.get("/check-auth", verifyToken,checkAuth);

// Rota para cadastro / login / logout
 router.post("/signup",signup  )//Ok
 router.post("/login",login)
 router.post("/logout",logout)//Ok

 /// Rota para verificar se o token de verificação está valido
 router.post("/verify-email",verifyEmail)//Ok

 // Rota para esqueci a senha
 router.post("/forgot-password", forgotPassword);
/// Rota para trocar a senha
 router.post("/reset-password/:token", resetPassword);
/*  router.get("/reset-password/:token", (req, res) => {
    res.send(); // Ou um HTML de resposta
});
 */


export default router;