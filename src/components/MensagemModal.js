import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const MensagemModal = (props) => {

  return (
    <Modal show={props.show} onHide={!props.show}>
        <Modal.Header closeButton>
          <Modal.Title>{props.titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.mensagem}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={!props.show}>
          ❌Cancelar
          </Button>
          <Button variant="success" onClick={!props.show}>
          ✔️Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
     )   
};

export default MensagemModal;
