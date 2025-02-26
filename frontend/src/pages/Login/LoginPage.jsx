import {motion} from 'framer-motion'
import { useState } from 'react'
import { Mail, Lock, Loader } from "lucide-react"; // import dos icons
import Input from '../../components/Input';
import { Link } from 'react-router-dom';
import { authStore } from '../../store/authStore';

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {login,isLoading,error}=authStore()

  const handleLogin = async(e) => {
    e.preventDefault()
    
    await login(email, password);
    
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden' > 

     <div className='p-8'>
              {/* titulo */}
     <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>Bem-vindo(a)</h2>

      <form onSubmit={handleLogin}>

        <Input icon={Mail} placeholder="Digite seu email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        
        <Input icon={Lock} placeholder="Digite sua senha" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      

      <div className='flex items-center mb-6'>
          <Link to='/forgot-password' className='text-sm text-green-400 hover:underline'>
            Esqueceu a senha ?
          </Link>
      </div>
      {error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}
       {/* Botão de login */}
       <motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
						type='submit'
            disabled={isLoading} /* disabled  desabilita o botão quando o estado é true*/
					>
            {isLoading ? <Loader className='w-6 h-6 animate-spin  mx-auto' /> : "Entrar"}
					</motion.button>
          </form>
      </div>
      <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
	     <p className='text-sm text-gray-400'>
	    	Não possui uma conta ?{" "}
	     	<Link to='/cadastro' className='text-green-400 hover:underline'>
		  	 Cadastre-se
		   </Link>
	    </p>
</div>


    </motion.div>
  )
}

export default LoginPage