import { Navigate, Route, Routes } from "react-router-dom"
import { FloatingShape } from "./components/FloatingShape"
import RegisterPage from "./pages/Register/RegisterPage"
import LoginPage from "./pages/Login/LoginPage"
import EmailVerificationPage from "./pages/Verification-Email/EmailVerificationPage"
import { Toaster } from "react-hot-toast"
import { authStore } from "./store/authStore"
import { useEffect } from "react"
import HomePage from "./pages/Home/HomePage"
import LoadingSpinner from "./components/LoadingSpinner"
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage"
import ResetPasswordPage from "./pages/ResertPassword/ResetPasswordPage"

// proteger rotas que exigem autenticação / OBsevação 
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = authStore(); // Pegamos se o usuário está logado e se verificou o e-mail.

  if (!isAuthenticated) { 
    return <Navigate to="/login" replace />; // Se não estiver logado, manda para o login.
  }

  if (!user.isVerified) {
    return <Navigate to="/verifica-email" replace />; // Se não verificou o e-mail, manda para a verificação, ex.. se inseriu numero de verificação .
  }

  return children; // Se passou por tudo, pode acessar a página protegida.
};


// redirecionar usuários autenticados para a página inicial, ex.. conta estiver "TRUE"
//O componente RedirectAuthenticatedUser serve para impedir que usuários já autenticados acessem páginas como login, cadastro e verificação de e-mail.
 // como fosse um middleware 

 // Ele vai envia para página home 
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = authStore()

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />
    // Remove a página atual do histórico, impedindo que o usuário volte para ela ao clicar no botão "Voltar" do navegador.

  }
  return children; // ele não estiver autenticado, ele vai retornar pode acessa pagina login e cadastro nornalmente

}

export const App = () => {
   // isso vai exercutar o checkAuth , que é uma função que vai checar se o usuário está logado antes de entra na página
  const {isCheckingAuth,checkAuth} = authStore()

  useEffect(() =>{
    checkAuth()

  },[checkAuth] )
 // se o estado é true , ele vai retornar um spinner,
 // No começo, ele está checando se o usuário já estava logado antes
  if (isCheckingAuth) return <LoadingSpinner />; // verificando se o usuário está logado
  
  return (  
    /* ele fica por baixo de todas as rotas , quando eu acessar a página, */
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      {/* eu estou enviando valore para FloatShape,  */}
      <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
      <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
			<FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />

       {/* ele fica por baixo de todas as rotas , quando eu acessar a página, o efeito que fiz  */}
       
      <Routes>
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />

        <Route path="/cadastro" element={<RedirectAuthenticatedUser>
                                               <RegisterPage />
                                         </RedirectAuthenticatedUser>} />

        <Route path="/login" element={<RedirectAuthenticatedUser>
                                            <LoginPage />
                                      </RedirectAuthenticatedUser>} />

        <Route path="/verifica-email" element={<RedirectAuthenticatedUser><EmailVerificationPage /></RedirectAuthenticatedUser>} />

         <Route path="/forgot-password" element={
                                           <RedirectAuthenticatedUser>
                                             <ForgotPasswordPage />
                                          </RedirectAuthenticatedUser>} /> 
          {/* o caminha vai ser igual do backend para redefinir senha  */}
      <Route path='/reset-password/:token' element={<RedirectAuthenticatedUser>
                                            <ResetPasswordPage/>
                                      </RedirectAuthenticatedUser>} />

       <Route path='*' element={<Navigate to='/' replace />} />  
                                    
      </Routes>
      <Toaster/>
       
    </div>
  
    
  )
}
