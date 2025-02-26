import { User } from "../models/User.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVericationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";


/// Rota para cadastro
export const signup = async (req, res) => {
     const { name, email, password } = req.body;

    try {
        if(!name || !email || !password){
           throw new Error("All fields are required");
        }
        const userAlreadyExist = await User.findOne({ email });
            
        if (userAlreadyExist) {
            res.status(400).json({sucess:false, message: "User already exist" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
            
        /// criar token de verificação , ele vai criar  num token aleatório e salvar no banco de dados
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        
          // estou passando valores dentra da instancia do User para depois salvar no banco de dados em seguida 
          
        const user = new User({ name,
              email, 
              password: hashedPassword,
              verificationToken,  /// criar token de verificação
              verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours expiration // expiração dele
              ///    verificationTokenExpiresAt esta armazenado o tempo de expiração do token 
             });
          
             await user.save(); // vai salvar o user no banco de dados
             console.log(user)
             /// esta função estou passando o res e o user._id , do user que acabou de ser salvo
             /// e ele res para ele retornar o token e o cookie
             //  // por isso essa função fica aqui   antes , para junto res,status e junto cookies que foi feito na função abaixo
            
             generateTokenAndSetCookie(res, user._id)



             // sendVericationEmail serve para enviar um email para o usuário com o token de verificação
             await sendVericationEmail(user.email, verificationToken);
         
             res.status(201).json({ 
                sucess: true, 
                message: "User created successfully", 
                user: {
                    ...user._doc,  // _doc é do mongoose que retorna o objeto do user , estou usando spread para copiar o objeto
                    password: null // Remover a senha da resposta
                }
            });
            

    } catch (error) {
        if (!res.headersSent) { // ⬅️ Evita erro de múltiplas respostas
            return res.status(400).json({ sucess: false, message: error.message });
        }
    }
}

/// Rota  verificação de Email de verificação  
export const verifyEmail = async (req, res) => {
    // 1 2 4 5 6
    const { code} = req.body;
    try {
         const user = await User.findOne({ 
            verificationToken: code,// verificação de token de verificação
            verificationTokenExpiresAt: { $gt: Date.now() } // verificação de expiração do token de verificação
            // "$gt "faz parte do mongodb , ele verifica se o valor é maior que o atual
         });
          // se o user não existir , ele retornará um erro
         if (!user) {
            return res.status(400).json({ sucess: false, message: "Invalid token or expired vefication code" });
         }
         user.isVerified = true; // quando ser torna verdadeiro 
         user.verificationToken = undefined; // remover token de verificação
         user.verificationTokenExpiresAt = undefined;//// remover expiração do token de verificação
         await user.save(); // salvar o user
         await sendWelcomeEmail(user.email, user.name);

         res.status(200).json({ sucess: true, message: "Email verified successfully",user: {
            ...user._doc,  // _doc é do mongoose que retorna o objeto do user , estou usando spread para copiar o objeto
            password: null // Remover a senha da resposta
        } });

    } catch (error) {

            console.error("Error in verifyEmail:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        
    }
}

/// Rota para logar
export const login = async (req, res) => {
   
     const { email, password } = req.body;
     try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }
        
        console.log("Antes de gerar token e setar cookie:", res.getHeaders());
        
        generateTokenAndSetCookie(res, user._id)
       
        console.log("Depois de gerar token e setar cookie:", res.getHeaders());
       
        user.lastLogin = Date.now();
        res.status(200).json({ sucess: true, message: "Logged in successfully",user: {
            ...user._doc,  // _doc é do mongoose que retorna o objeto do user , estou usando spread para copiar o objeto
            password: null // Remover a senha da resposta
        } });
     } catch (error) {
        console.log("Error in login ", error);
        res.status(400).json({ sucess: false, message: "Error verifying email", error: error.message });
        
     }
}

// Rota limpar token de login
export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
}

// Rota esqueci a senha

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        // Gerar um toke de redefinição de senha  
         const resetToken = crypto.randomBytes(20).toString("hex"); 
         const resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1h
         user.resetPasswordToken = resetToken;
         user.resetPasswordExpiresAt = resetPasswordExpiresAt;

         await user.save();

         //funcão que vai enviar link de redefinição de senha  http://localhost:5173
         // vou adicionar o resetToken no link , depois coloca na função enviar Email
       await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`)
          
         res.status(200).json({ success: true, message: "Password reset link sent to your email" });
    } catch (error) {
        console.log("Error in forgotPassword ", error);
		res.status(400).json({ success: false, message: error.message });
    }

} 
/// Rota troca de senha
export const resetPassword = async (req, res) => {
    const { token } = req.params; // vai ser token asim : ydt726gd7dbdbddgdgggdgd 
    const { password } = req.body;
    try {        /// metodo  findOne para save 
       const user = await User.findOne({
         resetPasswordToken: token ,
         resetPasswordExpiresAt: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid token" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;// vai reserta 
        user.resetPasswordExpiresAt = undefined; //vai reserta 
        await user.save();
        await sendResetSuccessEmail(user.email);
        res.status(200).json({ success: true, message: "Password reset successfully" });

    } catch (error) {
        console.log("Error in resetPassword ", error);
        res.status(400).json({ success: false, message: error.message });
    }
}


export const checkAuth = async (req, res) => {
	try {
         console.log("USER, ID",req.userId)
		const user = await User.findById(req.userId).select("-password"); // remover senha do objeto
        
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}
          
		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};
