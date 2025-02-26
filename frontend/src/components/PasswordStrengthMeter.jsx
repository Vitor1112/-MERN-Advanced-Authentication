import { Check, X } from "lucide-react"; 
// Essa função vai  fica dentro de PasswordStrengthMeter

const PasswordCriteria = ({ password }) => {
  // Quando estive digitando a senha , ele pegar cada digito ,vai entra  no array em cada objeto
  // e vai verificar se o objeto ser tem o criterico de senha
  // se for true , vai colocar o icone de check
  const criteria = [
    { label: "Pelo menos 6 caracteres", met: password.length >= 6 }, // aqui passa parametro "password"
    { label: "Contém letra maiúscula", met: /[A-Z]/.test(password) },// aqui passa parametro "password"
    { label: "Contém letra minúscula", met: /[a-z]/.test(password) },// aqui passa parametro "password"
    { label: "Contém um número", met: /\d/.test(password) },// aqui passa parametro "password"
    { label: "Contém caractere especial", met: /[^A-Za-z0-9]/.test(password) },// aqui passa parametro "password"
  ];
  

  return (
    // agora ele vai percorrer o array e vai colocar o icone de check ou x
    <div className='mt-2 space-y-1'>
      {criteria.map((item) => (
        <div key={item.label} className='flex items-center text-xs'>
          {item.met ? (
            <Check className='size-4 text-green-500 mr-2' />
          ) : (
            <X className='size-4 text-gray-500 mr-2' />
          )}
          <span className={item.met ? "text-green-500" : "text-gray-400"}>{item.label}</span>
        </div>
      ))}
    </div>
  );
};
const PasswordStrengthMeter = ({password}) => {

  const getStrength = (pass) => {

    // A variavel "let strength =0" vai guardar a somar de cada caractere ,Quando usuário digitar , ele vai entrar no "if  "se tiver o correspondente valor correspondente  , ela vai incrementar o valor de strength 
    // Inicializa a força da senha com 0
    // função que vai verificar o valor de strength E QUANTIDADE
    // 1- Se a senha tiver 6 ou mais caracteres, adiciona 1 ponto à força.
    // 2- Se a senha contiver pelo menos uma letra minúscula (a-z) e uma maiúscula (A-Z), adiciona 1 ponto.
    // 3- Se a senha contiver pelo menos um número (0-9), adiciona 1 ponto.
    // 4- Se a senha contiver pelo menos um caractere especial (qualquer coisa que não seja letra ou número), adiciona 1 ponto.
    // Retorna o valor final da força da senha (0 a 4)
   
   let strength = 0; // incrementar 6
 
   if (pass.length >= 6) strength++; 
   if (pass.match(/[a-z]/) || pass.match(/[A-Z]/)) strength++; //  mausculo ou minusculo ele só incrementa 1 
   if (pass.match(/\d/)) strength++; 
   if (pass.match(/[^a-zA-Z\d]/)) strength++; 
   return strength; 
 };

  //"password "é o parametro passado para a função PasswordStrengthMeter que usuario esta digitando a senha la no cadastro.
    // Essa variavel "const strengthPower" recebe o Resultado da da  função "getStrength() 
    const strengthPower = getStrength(password);  

 /////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Essa função vai retornar o valor de cor de acordo com o valor de strength
  // são 4 posições da do array 
  const getColor = (strength) => {  // "Função responsável por retornar a cor da barra de força da" 
    if (strength === 0) return "bg-red-500"; 
    if (strength === 1) return "bg-red-400";
    if (strength === 2) return "bg-yellow-500";
    if (strength === 3) return "bg-yellow-400";
    return "bg-green-500"; // tiver todos os critérios mensurados  em cima da senha , vai retornar "bg-green-500"
  };

      
  const getStrengthText = (strength) => { // Função responsável por retornar a descrição da força da senha

     // A função `getStrengthText` avalia a força de uma senha com base em um valor numérico.
     // Dependendo desse valor, a função retorna uma descrição da força da senha:
     // - Se o valor for 0, a função retorna "Muito Fraca".
     // - Se o valor for 1, a função retorna "Fraca".
     // - Se o valor for 2, a função retorna "Razoável".
     // - Se o valor for 3, a função retorna "Boa".
     // - Para valores maiores que 3, a função considera a senha "Forte".


    if (strength === 0) return "Muito Fraca";
    if (strength === 1) return "Fraca";
    if (strength === 2) return "Razoável";
    if (strength === 3) return "Boa"
    return "Forte"; // tiver todos os critérios mensurados  em cima da senha , vai retornar "Forte"
  };
  

  return (
    <div className='mt-2'>
      <div className='flex justify-between items-center mb-1'>
        <span className='text-xs text-gray-400'>Força da senha</span>
        <span className='text-xs text-gray-400'>{getStrengthText(strengthPower)}</span>

          {/* // Dentro da getStrengthText()  vou passa variavél a "strengthPower"que vem comresultdo da função "getStrength()" ,Então o resultado vai entra na função getStrengthText() , e vai retornar uma descrição da força da senha , como "Muito Fraca" , "Fraca" , "Razoável" , "Boa" e "Forte" , dependendo do valor de "strengthPower" que armazenado na variável "strengthPower"  */}
       
      </div>
    
      <div className='flex space-x-1'>
        {[...Array(4)].map((_, index) => (  // aqui ele vai criar um array de 4 elementos , e vai passar o index para o map , 4 elemento vazio. exemplo assim "[undefined, undefined, undefined, undefined]"
    
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full transition-colors duration-300
              ${index < strengthPower ? getColor(strengthPower) : "bg-gray-600"}
            `}

            /* ${index < strengthPower ? getColor(strengthPower) : "bg-gray-600" */
            // O map vai percorrer o array , eu vou pegar o valor de index as  4 posições dele , depois  vou verificar se o valor do index é menor que o valor de  "strengthPower " ser sim , vou adicionar na funçao "getColor" , a variável " strengthPower " , senao vai retornar "bg-gray-600"

            // SERÁ A Cor exibida na" barra "de força da senha na tela para usuário visualizar .
            // EX..bg-red-500 , bg-yellow-500 , bg-green-500 

            // Lembrando  valor da variável "strengthPower" esta vindo da função "getStrength()" 
    
            
          />
        ))}
      </div>
      <PasswordCriteria password={password} />  
     {/*  // Componente que verifica os critérios de segurança da senha e exibe um ícone de check (✔️) 
      // se o critério for atendido, ou um X (❌) caso contrário. quando usuario começa a digitar a senha, ele vai passar o valor da senha para esse componente , vai verificar se o critério é atendido ou não , e exibir o ícone de acordo com o resultado. no array "criteria" , temos 4 critérios de segurança .
 */}
    </div>
  );
};

export default PasswordStrengthMeter;



