import React, { useEffect } from "react";


const Inicio = () => {
    useEffect(() => {        
        document.title = 'Página não encontrada';
      }, []);
  
  return (
    <div>
      <h1>
        Página não encontrada
      </h1>
      </div>
     )   
};

export default Inicio;