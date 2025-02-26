import { motion } from "framer-motion";
import { useState } from "react";
import { authStore } from "../../store/authStore";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../../components/Input";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);
    const { isLoading, forgotPassword ,error} = authStore();

    const handleSubmit = async (e) => {
		e.preventDefault();
        await forgotPassword(email);
        setIsSubmitted(true); // quando for true vai mostrar texto para verficação de email
		
		
	};
  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
     >
        <div className="p-8">
       				<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
                       Esqueceu sua senha
				</h2>
                {!isSubmitted ?(
                    <form onSubmit={handleSubmit}>
                        <p className='text-gray-300 mb-6 text-center'>
                          Digite seu endereço de e-mail e enviaremos um link para redefinir sua senha.
						</p>
                        <Input icon={Mail} type='email'placeholder='Email Address'value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>	
                        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                        <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                        type='submit'
                    >
                       {/* Se isLoading for true , mostrar Loader */}
                       {isLoading ? <Loader className='size-6 animate-spin mx-auto' /> : "Enviar Link de Redefinição"}
                    </motion.button>
                    </form>
                ):(<div className='text-center'>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4'
                    >
                        <Mail className='h-8 w-8 text-white' />
                    </motion.div>
                    <p className='text-gray-300 mb-6'>
                    Se uma conta existir para {email}, você receberá um link para redefinir sua senha em breve.
                    </p>
                </div>)}
        </div>
        <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
				<Link to={"/login"} className='text-sm text-green-400 hover:underline flex items-center'>
					<ArrowLeft className='h-4 w-4 mr-2' /> Voltar para Login
				</Link>
			</div>
      
    </motion.div>
  )
}

export default ForgotPasswordPage
