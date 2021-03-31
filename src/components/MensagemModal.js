import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const MensagemModal = (props) => {
const { mostrar, titulo, mensagem } = props
  return (
    <Modal animation={false} show={mostrar} onHide={() => props.setConfirmaExclusao(!mostrar)}>
        <Modal.Header closeButton>
          <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{mensagem}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => props.setConfirmaExclusao(!mostrar)}>
          ❌Cancelar
          </Button>
          <Button variant="success" onClick={() => {props.excluir(props.categoria)
                                                    props.setConfirmaExclusao(!mostrar)}}>
          ✔️Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
     )   
};

export default MensagemModal;
