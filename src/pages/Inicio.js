import React, { useEffect } from "react";
import Cabecalho from './Cabecalho'
import Rodape from './Rodape'
import Container from 'react-bootstrap/Container'

const Inicio = () => {
  useEffect(() => {
    document.title = 'Menu Inicial';
  }, []);

  return (
    <div>
      <Container fluid className="p-0">
        <Cabecalho />
        <Rodape />
      </Container>
    </div>
  )
};

export default Inicio;