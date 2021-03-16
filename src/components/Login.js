import React, { useEffect, useState } from "react"
import { ReactComponent as Lock } from '../images/lock.svg'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


const Login = () => {
  useEffect(() => {
    document.title = 'Área Reservada';
  }, []);

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    /*backgroundImage: 'url(https://picsum.photos/1920)' */
    <Container fluid style={{background: '#007BFF'}}>
      <Row style={{ height: "100vh" }} className="align-items-center" >
        <Col xs={12} md={4} className="m-auto">
          <Card >
            <Card.Header className="text-center text-primary" ><h3>DogWalker</h3></Card.Header>
            <center><Lock /></center>
            <Card.Body>
              <Card.Title>Área Reservada</Card.Title>
              <Card.Text>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group >
                    <Form.Label>Endereço de e-mail</Form.Label>
                    <Form.Control type="email" placeholder="seuemail@algo.com.br" required />
                    <Form.Control.Feedback type="invalid">
                      Informe um e-mail válido
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                      Seguindo a <a target="_blank" rel="noreferrer" href="http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/L13709.htm">LGPD</a>, não compartilhamos o seu e-mail com ninguém.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group >
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" placeholder="Senha" required />
                    <Form.Control.Feedback type="invalid">
                      Informe uma senha
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group >
                    <Form.Check type="checkbox" label="Lembrar Usuário" />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Login
                 </Button>
                </Form>
                <p>Ainda não tem um usuário? Crie o seu!</p>
              </Card.Text>

            </Card.Body>
            <Card.Footer className="text-center">Campos marcados com <strong>*</strong> são obrigatórios</Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
};

export default Login;