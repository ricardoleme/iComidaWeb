import { useRef, useState } from 'react';
import { BACKEND } from '../constants'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'


function Restaurantes() {
  const filesElement = useRef(null)
  const imagemVazia = {
    originalname: '',
    path: '',
    size: 0,
    mimetype: ''
  }
  const [progressoImagem, setProgressoImagem] = useState(0)
  const [imagem, setImagem] = useState(imagemVazia)




  const enviaArquivo = async (event) => {
    setProgressoImagem(10)
    const dataForm = new FormData();
    for (const file of filesElement.current.files) {
      dataForm.append('file', file);
    }
    setProgressoImagem(30)
    const res = await fetch(`http://localhost:4000/upload`, {
      method: 'POST',
      body: dataForm,
    });
    const data = await res.json();
    setProgressoImagem(100)

    const { originalname, path, size, mimetype } = data.files[0]
    setImagem({ originalname: originalname, path: path, mimetype: mimetype, size: size })
    setProgressoImagem(0)
    
  };


  return (
    <Row>
      <Col>
        {progressoImagem > 0 && <ProgressBar animated now={progressoImagem} label={`${progressoImagem}%`} />}
        <Form>
          <Form.Group controlId="imagem">
            <Form.Label>Foto do Restaurante:</Form.Label>
            {imagem.size > 0 &&
              <Image src={`${BACKEND}/${imagem.path}`} thumbnail width="100" title={imagem.originalname} alt={imagem.originalname} />
            }
            <Form.Control type="file" ref={filesElement} />
          </Form.Group>
          <Button variant="success" onClick={enviaArquivo}>Enviar Arquivo</Button>
        </Form>
      </Col>
    </Row>
  );
}

export default Restaurantes;
