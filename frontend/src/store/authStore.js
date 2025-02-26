import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3000";
axios.defaults.withCredentials = true;//faz com que todas as requisições feitas com Axios incluam automaticamente cookies e credenciais de autenticação (como tokens de sessão).




 export const authStore = create((set) =>({

    user: null, //Aqui guardamos o usuário (no começo é ninguém → null)
    isAuthenticated: false,//Aqui dizemos se o usuário está logado (true) ou não (false).
    error: null, //: Aqui guardamos erros, caso algo dê errado.
    isLoading: false, // Aqui falamos se o cadastro está acontecendo (true) ou já acabou (false).
    isCheckingAuth: true,//: No começo, ele está checando se o usuário já estava logado antes
    message: null, //Guardamos mensagens que podem aparecer

    signup: async (name, email, password) => {
        set({ isLoading: true ,error: null });// ele vai começa como verdadeiro, error vai ser null
        try {
           const response = await axios.post(`${API_URL}/signup`, { name, email, password })
           set({ user: response.data.user ,isAuthenticated: true ,isLoading: false}); // set vai receber "user" como o usuário que acabou de se cadastrar
        } catch (error) {
            set({ error: error.response.data.message || 'Erro signup', isLoading: false });// set vai receber error backed como mensagem
            throw error;
            //throw error; → Joga o erro completo, que inclui não só a mensagem, mas também código de status, headers, etc.
        }

    },
    login: async(email, password) => {
        set({ isLoading: true ,error: null });// ele vai começa como verdadeiro, error vai ser null
        try {
           const response = await axios.post(`${API_URL}/login`, { email, password })
           set({ user: response.data.user ,isAuthenticated: true ,isLoading: false}); // set vai receber "user" como o usuário que acabou de se cadastrar
        } catch (error) {
            set({ error: error.response.data.message || 'Erro Login', isLoading: false });// set vai receber error backed como mensagem
            throw error;
            //throw error; → Joga o erro completo, que inclui não só a mensagem, mas também código de status, headers, etc.
        }

    },
    logout: async() => {
        set({ isLoading: true, error: null });
		try {
			await axios.post(`${API_URL}/logout`);
			set({ user: null, isAuthenticated: false, error: null, isLoading: false });
		} catch (error) {
			set({ error: "Error logging out", isLoading: false });
			throw error;
		}

    },
    verifyEmail: async(code) => {
        set({ isLoading: true ,error: null });
        try {
            const response = await axios.post(`${API_URL}/verify-email`, { code })
            // quando envia um email , ai ser tornar  isAuthenticated: true 
            set({ user: response.data.user ,isAuthenticated: true ,isLoading: false});
            return response.data // Isso devolve os dados dentro de data 
        } catch (error) {
            set({ error: error.response.data.message || "Error verifying email", isLoading: false });
			throw error;
            
        }
    },
    checkAuth : async()=>{
        await new Promise((resolve) => setTimeout(resolve, 2000));
        set({ isCheckingAuth: true ,error: null });
        try {
            const response = await axios.get(`${API_URL}/check-auth`)
            set({ user: response.data.user ,isAuthenticated: true ,isCheckingAuth: false});
        } catch (error) {
            set({ error:null , isCheckingAuth: false , isAuthenticated: false });
            
        }

    },
    forgotPassword: async(email) => {
        set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/forgot-password`, { email });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				/* error: error.response.data.message || "Error sending reset password email", */
                 error: error.response.data.message  === "User not found" ? "Usuário não encontrado" : error|| "Erro ao enviar e-mail de redefinição",
			});
			throw error;
		}
    },
    resetPassword: async(token, password) => {
        set({ isLoading: true, error: null });
        try {
			const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error resetting password",
			});
			throw error;
		}

    },
    

}))



/* 
Sim, com a configuração de cookies, o comportamento que você está descrevendo é esperado.

Aqui está um resumo do que está acontecendo:

Login e cookies: Quando o usuário faz login, o backend provavelmente está retornando um cookie de autenticação (como um JWT ou sessão), que será armazenado automaticamente pelo navegador. Isso acontece porque você configurou axios.defaults.withCredentials = true, o que faz com que o Axios envie o cookie em todas as requisições subsequentes.

Persistência de autenticação: Quando o usuário navega entre páginas ou volta à página após sair e voltar, o cookie de autenticação ainda estará presente no navegador, o que permite que o backend verifique se o usuário está autenticado sem a necessidade de fornecer novamente as credenciais. O backend irá responder com os dados do usuário e a variável isAuthenticated será definida como true.

Função checkAuth: A função checkAuth que você implementou é fundamental para verificar se o usuário está autenticado ao iniciar a aplicação ou ao acessar uma nova página. Ela faz uma requisição para o endpoint /check-auth e, se o backend encontrar um cookie válido, o usuário será considerado autenticado (isAuthenticated: true). Isso pode ocorrer mesmo após o usuário sair de uma página e voltar, desde que o cookie esteja presente e válido.

Comportamento desejado: Como você usou cookies, o estado de autenticação (isAuthenticated) será mantido até o cookie expirar ou o usuário fazer logout. Isso é o que permite que o valor de isAuthenticated permaneça como true, mesmo após navegar entre páginas ou recarregar a aplicação.

Algumas sugestões:
Certifique-se de que o backend está configurado para enviar o cookie com a flag HttpOnly e Secure para garantir que ele seja armazenado de forma segura e não acessível via JavaScript.
Se o cookie expirar ou for removido, o estado de isAuthenticated será alterado para false, e você pode precisar redirecionar o usuário para a página de login ou mostrar uma mensagem de erro.
O fluxo de verificação do cookie deve ser feito de maneira eficiente, como você já está fazendo com a função checkAuth.
Por exemplo, o comportamento esperado seria:

O usuário faz login → o cookie de autenticação é armazenado.
O usuário navega para outra página ou fecha e abre o navegador → o cookie de autenticação ainda está lá.
Quando a página é carregada novamente, a função checkAuth verifica o cookie, encontra o usuário autenticado e define isAuthenticated: true.
Portanto, sim, o valor de isAuthenticated será mantido como true enquanto o cookie de autenticação estiver presente e válido.


 */




