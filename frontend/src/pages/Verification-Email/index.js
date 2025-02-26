import React, { useState } from 'react';

const ArrayInputExample = () => {
  // Estado que armazena um array de valores
  const [values, setValues] = useState(["", "", ""]);

  // Função para lidar com a mudança no input
  const handleChange = (index, event) => {
    
    const newValues = [...values]; // Cria uma cópia do array atual
    newValues[index] = event.target.value; // Atualiza o valor na posição do array
    setValues(newValues); // Atualiza o estado com o novo array
  };

  return (
    <div>
      <h2>Array de Inputs</h2>
      <form>
        {/* Mapeia os inputs do array */}
        {values.map((value, index) => (
          <div key={index}>
            <label>Valor {index + 1}: </label>
            <input
              type="text"
              value={value} // O valor do input é o item do array
              onChange={(event) => handleChange(index, event)} // Atualiza o estado com o novo valor
            />
          </div>
        ))}
      </form>
      <div>
        <h3>Valores Atuais:</h3>
        <ul>
          {values.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArrayInputExample;
