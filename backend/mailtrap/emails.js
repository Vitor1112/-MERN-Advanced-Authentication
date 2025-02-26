import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { MailtrapTransportClient, sender } from "./mailtrapConfig.js";

export const sendVericationEmail =  async(email, verificationToken) => {


   try {
     const  responde = await MailtrapTransportClient.sendMail({
        from:sender,
        to:  email , // passa direito o email 
        subject: "Verifique Seu E-mail",
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
        category: "Verification Email",

     })
     console.log("Email sent successfully", responde);
   } catch (error) {
      console.log("Error sending email", error);
      throw new Error(`Error sending email: ${error}`);
   }
}

export const sendWelcomeEmail = async (email, name) => {
    try {
      const response = await MailtrapTransportClient.sendMail({
          from: sender,
          to: email,
          subject: "Bem-vindo à nossa plataforma!", // ✅ Adicionando um assunto
          text: `Olá, ${name}!  Bem-vindo(a) à nossa plataforma!`, // ✅ Adicionando um assunto
          category: "Welcome Email",
      });
      console.log("Email sent successfully", response);
    } catch (error) {
      console.log("Error sending welcome email", error);
    }
  };

  
  export const sendPasswordResetEmail =async( email, resetURL) =>{

    try {
        const response = await MailtrapTransportClient.sendMail({
            from: sender,
            to: email,
            subject: "Redefinição de Senha",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset Email",

        })
        console.log("Email sent successfully", response);
    } catch (error) {

        console.log("Error sending password reset email", error);
      
    }
    

    
  }

  export const sendResetSuccessEmail = async (email) => {
    
    try {
       const response = await MailtrapTransportClient.sendMail({
           from: sender,
           to: email,
           subject: "Redefinição de Senha Bem-Sucedida",
           html: PASSWORD_RESET_SUCCESS_TEMPLATE,
           category: "Password Reset Success Email",
       })
       console.log("Email sent successfully", response);
    } catch (error) {
      console.log("Error sending password reset success email", error);
      throw new Error(`Error sending email: ${error}`);
      
    }
  }