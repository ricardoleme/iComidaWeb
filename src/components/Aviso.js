import React from 'react'
import Toast from 'react-bootstrap/Toast'

const Aviso = (props) => {
const { mostrar, titulo, mensagem } = props
  return (
    <Toast onClose={() => props.setAviso('')} 
           show={mostrar} 
           animation={false} 
           delay={4000} 
           autohide 
           className="bg-success"
           style={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}>
          <Toast.Header> 
            <strong className="mr-auto">{titulo}</strong>
            <small>👏</small>
          </Toast.Header>
          <Toast.Body className="text-light">{mensagem}</Toast.Body>
        </Toast>
     )   
};

export default Aviso;
