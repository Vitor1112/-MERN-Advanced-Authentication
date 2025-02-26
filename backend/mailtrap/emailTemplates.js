export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verifique Seu E-mail</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verifique Seu E-mail</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Olá,</p>
    <p>Obrigado por se cadastrar! Seu código de verificação é:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{verificationCode}</span>
    </div>
    <p>Digite este código na página de verificação para concluir seu cadastro.</p>
    <p>Por motivos de segurança, este código expirará em 15 minutos.</p>
    <p>Se você não criou uma conta conosco, ignore este e-mail.</p>
    <p>Atenciosamente,<br>Equipe do Seu App</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>Esta é uma mensagem automática, por favor, não responda a este e-mail.</p>
  </div>
</body>
</html>
`;



export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Redefinição de Senha Bem-Sucedida</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Redefinição de Senha Bem-Sucedida</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Olá,</p>
    <p>Estamos enviando este e-mail para confirmar que sua senha foi redefinida com sucesso.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>Se você não solicitou esta redefinição de senha, entre em contato com nossa equipe de suporte imediatamente.</p>
    <p>Por motivos de segurança, recomendamos que você:</p>
    <ul>
      <li>Use uma senha forte e única</li>
      <li>Ative a autenticação em dois fatores, se disponível</li>
      <li>Evite usar a mesma senha em vários sites</li>
    </ul>
    <p>Obrigado por nos ajudar a manter sua conta segura.</p>
    <p>Atenciosamente,<br>Equipe do Seu App</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>Esta é uma mensagem automática, por favor, não responda a este e-mail.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Redefinir Sua Senha</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Redefinição de Senha</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Olá,</p>
    <p>Recebemos uma solicitação para redefinir sua senha. Se você não fez essa solicitação, ignore este e-mail.</p>
    <p>Para redefinir sua senha, clique no botão abaixo:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Redefinir Senha</a>
    </div>
    <p>Por motivos de segurança, este link expirará em 1 hora.</p>
    <p>Atenciosamente,<br>Equipe do Seu App</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>Esta é uma mensagem automática, por favor, não responda a este e-mail.</p>
  </div>
</body>
</html>
`;
