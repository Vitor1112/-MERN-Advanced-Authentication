import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { authStore } from "../../store/authStore";
import toast from "react-hot-toast";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]); // ele que fazendo 6 quadrados na tela
  const inputRefs = useRef([]);
  const navigate = useNavigate(); // Corrigido de "navegate" para "navigate"
  const {error, isLoading, verifyEmail} = authStore()

  const handleChange = (index, value) => {
  /*   console.log("Valor bruto do code antes da mudança:", [...code]); // Mostra o array `code` antes de qualquer modificação
    console.log("Valor digitado:", value); // Mostra o que foi digitado */

    const newCode = [...code];  // newCode vai receber o que esta dentro do code["", "", "", "", "", ""] vai contem o array original

    /*   Se for maior que 1, significa que o usuário colou algo, e não digitou um por um.
         slice(0, 6) pega só os primeiros 6 números.
         split("") divide cada número/letra em uma lista.
         pastedCode = ["9", "8", "7", "6", "5", "4"]
     */ 
     // AQUI SE USUÁRIO COLOU UM NÚMERO E NÃO DIGITOU UM POR UM
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      // Quando preencher o input, o foco vai para o próximo input
       // newCode = ["1", "2", "3", "", "", ]
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      // Escolher qual caixinha deve ser focada (se a última preenchida foi até a quinta, foca na sexta)
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      // Se digitar vai ser assim 
      newCode[index] = value;
      setCode(newCode);

      // Quando preencher o input, o foco vai para o próximo input
      // se existir valor e index for menor que 5
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = ( value, index) => {
    /*  verifica se todos os campos estão verdes primeiro */
    // 1- vai verificar se a tecla que apertou é backspace  
    // 2- && significa "e também "
    // 3- !code[index]  ela vai verificar se campo nesta posição está vazio
    // 4- index > 0 se o index é maior que 0
      // tudo for true ela executa a linha de codigo
    
    if (value.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  // Função para enviar código de verificação do email
  const handleSubmit = async (e) => {
    e.preventDefault();
    const veficationCode = code.join("");// join vai junta os numeros
    try {
      await verifyEmail(veficationCode)
      navigate("/")
      toast.success("Email verificado com sucesso!")
    } catch (error) {
      console.log(error)
      
    }
    
    

  }
  // Ele fica monitorando code , ser esta vazio ou não , estiver preenchido com valor ,vai chamar o handleChange
useEffect(() => {
  if (code.every (digit => digit !== "")) {
    handleSubmit(new Event('submit')) 

  }
}, [code]);
  return (
    <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">Verifique Seu E-mail</h2>

        <p className="text-center text-gray-300 mb-6">Digite o código de 6 dígitos </p>

        <form onSubmit={handleSubmit}  className="space-y-6">
          <div className="flex justify-between">
            {/* digit é o dígito que usuário digitar */}
            {/* ref={ref => inputRefs.current[index] = ref vai guardar a referência do index, ou seja, vai guardar apenas as posições de index de cada input */}
            {code.map((digit, index) => ( 
              <input key={index} ref={ref => inputRefs.current[index] = ref} type="text" maxLength="6"
                value={digit} onChange={(e) => handleChange(index, e.target.value)}
                //value é o valor que o usuário digitou que vai aparecer na tela,esta vindo do code, que vai aparecer no input
                onKeyDown={(e) => handleKeyDown(e, index)}

                className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none"
              />
            ))}
          </div>
          {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type='submit'
            disabled={isLoading || code.some((digit) => !digit)}
            // Se estiver true o botão ficará desabilitado, mostrara a mensagem ""Verificando..."
            // "OU" se algum campo estiver vazio sem valor , some vai verificar se algum campo está vazio, desativando o botão. se tiver vazio é true , ele vai desabilitar o botão.
            className='w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50'
          > 
            {isLoading ? "Verificando..." : "Verificar E-mail"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default EmailVerificationPage;


/////
/* 🚀 Diferença entre value={digit} e e.target.value
🔹 value={digit} → Está pegando o valor dentro do code e exibindo no input.
🔹 e.target.value → É o que o usuário está digitando no input no momento.

Agora, como eles se conectam?

1️⃣ O usuário digita um número no input → e.target.value captura esse número.
2️⃣ A função handleChange(index, e.target.value) é chamada e atualiza code.
3️⃣ Como value={digit}, e digit vem do code, o input exibe o valor atualizado.

Então, value={digit} recebe o que foi digitado depois que o estado code é atualizado. 🎯 */

/* Não, o e.target.value não faz parte do value={digit}. Eles estão conectados, mas são coisas diferentes. Vou explicar de forma simples:

📌 Como eles funcionam juntos?
value={digit} → Mostra o valor que já está guardado no code.
onChange={(e) => handleChange(index, e.target.value)} → Atualiza o code com o que foi digitado (e.target.value).
🔄 O ciclo acontece assim:
1️⃣ O input já começa vazio porque code = ["", "", "", "", "", ""].
2️⃣ O usuário digita um número, por exemplo, "5".
3️⃣ O onChange captura esse valor com e.target.value = "5" e chama handleChange(index, "5").
4️⃣ O handleChange atualiza o estado code, agora code = ["5", "", "", "", "", ""].
5️⃣ O React redesenha o input, e como value={digit}, o input mostra o novo valor "5".

Ou seja, o value={digit} sempre reflete o estado atualizado depois do onChange rodar. 🚀 */