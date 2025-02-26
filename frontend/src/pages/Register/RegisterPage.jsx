import { motion } from 'framer-motion'
import { Loader, Lock, Mail, User } from "lucide-react";
import Input from '../../components/Input'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordStrengthMeter from '../../components/PasswordStrengthMeter';
import { authStore } from '../../store/authStore';




const RegisterPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { signup ,error, isLoading } = authStore()

    //Função para enviar  dados ao backend  de cadastro
    const handleRegister = async(e) => {
        e.preventDefault()
        try {
          await signup(name, email, password)
          navigate('/verifica-email')
        } catch (error) {
          console.log(error)
        }

    }

  return (
    <motion.div
    /* vai fazer o efeito de animação */
    initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
			overflow-hidden'
    > 
     <div className='p-8'>
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>Cadastre-se</h2>

        <form onSubmit={handleRegister}>

        <Input icon={User} placeholder="Digite seu nome" type="text" value={name} onChange={e => setName(e.target.value)} />

        <Input icon={Mail} placeholder="Digite seu email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        
        <Input icon={Lock} placeholder="Digite sua senha" type="password" value={password} onChange={e => setPassword(e.target.value)} />

                  {/* mostra mensagem de erro se houver */}
            {error && <p className='text-red-500 text-center'>{error}</p>}
            <PasswordStrengthMeter password={password} />{/* Medidor de força da senha  */}

          {/* Button start here */}
          <motion.button className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600	hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type='submit'
          disabled={isLoading}
          >
           {isLoading ?  <Loader className=' animate-spin mx-auto' size={24} />  : "Cadastrar"}
          </motion.button>
          
        </form>

     </div>
     <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
				<p className='text-sm text-gray-400'>
					Já possui uma conta ?{" "}
					<Link to={"/login"} className='text-green-400 hover:underline'>
						Entrar
					</Link>
				</p>
			</div>


      
    </motion.div>
  )
}

export default RegisterPage
