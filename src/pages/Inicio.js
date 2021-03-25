import React, { useEffect } from "react";


const Inicio = () => {
    useEffect(() => {        
        document.title = 'iComida';
      }, []);
  
  return (
    <div>
      <h1>
        Bem vindo ao iComida
      </h1>
      </div>
     )   
};

export default Inicio;