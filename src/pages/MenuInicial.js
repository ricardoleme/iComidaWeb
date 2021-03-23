import React, { useEffect } from "react";


const MenuInicial = () => {
    useEffect(() => {        
        document.title = 'Menu Inicial';
      }, []);
  
  return (
    <div>
      <h1>
        Seja bem vindo!
      </h1>
      </div>
     )   
};

export default MenuInicial;