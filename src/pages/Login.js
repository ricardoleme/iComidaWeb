import React, { useEffect, useState } from "react"
import { ReactComponent as Lock } from '../images/lock.svg'
import { useHistory } from "react-router-dom"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'

import { FaLock } from 'react-icons/fa'

import { BACKEND } from '../constants'

const Login = () => {
  const history = useHistory() //redirecionar a página
  const [emailField, setEmailField] = useState('')
  const [passwordField, setPasswordField] = useState('')
  const [validandoLogin, setValidandoLogin] = useState(false)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    document.title = 'Área Reservada';
  }, []);


  async function validaLogin(email, senha) {
    setValidandoLogin(true)
    let url = `${BACKEND}/usuarios/login`
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, senha: senha })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        data.errors ? setErro(data.errors[0].msg) : setErro(null)
        if(data.access_token) {
          localStorage.setItem("access_token", data.access_token)
          localStorage.setItem("usuario", JSON.stringify(data.usuario))
          history.push("/menu")
      }
      })
      .catch(function (error) {
        console.error('Erro ao tentar efetuar o login: ' + error.message);
      });
    setValidandoLogin(false)
  }




  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {

    event.preventDefault();

    validaLogin(emailField, passwordField)
    
    setValidated(true);
  };

  return (
    /*backgroundImage: 'url(https://picsum.photos/1920)' */
    <Container fluid style={{ background: '#007BFF' }}>
      <Row style={{ height: "100vh" }} className="align-items-center" >
        <Col xs={12} md={4} className="m-auto">
          <Card >
            <Card.Header className="text-center text-primary" ><h3>DogWalker</h3></Card.Header>
            <center><Lock /></center>
            <Card.Body>
              <Card.Title>Área Reservada</Card.Title>

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group >
                  <Form.Label>Endereço de e-mail</Form.Label>
                  <Form.Control type="email" placeholder="seuemail@algo.com.br" required
                    value={emailField} onChange={event => setEmailField(event.target.value)} />
                  <Form.Control.Feedback type="invalid">
                    Informe um e-mail válido
                    </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    Seguindo a <a target="_blank" rel="noreferrer" href="http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/L13709.htm">LGPD</a>, não compartilhamos o seu e-mail com ninguém.
                    </Form.Text>
                </Form.Group>

                <Form.Group >
                  <Form.Label>Senha</Form.Label>
                  <Form.Control type="password" placeholder="Senha" required
                    value={passwordField} onChange={event => setPasswordField(event.target.value)} />
                  <Form.Control.Feedback type="invalid">
                    Informe a senha
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group >
                  <Form.Check type="checkbox" label="Lembrar Usuário" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  {validandoLogin ? <Spinner animation="border" size="sm" /> : <FaLock />} Login
                 </Button>
              </Form>
              <p>Ainda não tem um usuário? Crie o seu!</p>
              {erro && 
              <Alert variant="danger" onClose={() => setErro(null)} dismissible>
                <p>{erro}</p>
              </Alert>
              }
            </Card.Body>
            <Card.Footer className="text-center">Campos marcados com <strong>*</strong> são obrigatórios</Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
};

export default Login;