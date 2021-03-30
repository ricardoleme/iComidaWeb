import React, { useEffect, useState } from "react";
import Cabecalho from './Cabecalho'
import Rodape from './Rodape'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

import { BACKEND, opcoesPaginacao } from '../constants'
import MensagemModal from '../components/MensagemModal'

import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'

import { MdRestaurantMenu, MdDeleteForever, MdModeEdit, MdStorage, MdWeb, MdSave } from 'react-icons/md'

const Categorias = () => {
  const valorInicial = { nome: '', status: true }
  const [erros, setErros] = useState({})
  const [categoria, setCategoria] = useState(valorInicial)
  const [categorias, setCategorias] = useState([])
  const [carregandoCategorias, setCarregandoCategorias] = useState(false)
  const [salvandoCategorias, setSalvandoCategorias] = useState(false)
  const [confirmaExclusao, setConfirmaExclusao] = useState(false)
  const token = localStorage.getItem('access_token')
  const { _id, nome, status } = categoria

  /* DataTable */
  const colunas = [{
    dataField: 'nome',
    text: 'Nome da Categoria',
    sort: true
  }, {
    dataField: 'status',
    text: 'Status',
    sort: true
  }, {
    dataField: 'link',
    text: 'Opções',
    formatter: (rowContent, row) => {
      return (
        <>
          <Button variant="outline-danger" title="Remover o registro" onClick={() => setConfirmaExclusao(true)}>
            <MdDeleteForever />
          </Button>
        &nbsp;
          <Button variant="outline-primary" title="Editar o registro" onClick={() => setCategoria(row)}>
            <MdModeEdit />
          </Button>
        </>
      )
    }
  }
  ]

  useEffect(() => {
    document.title = 'Cadastro de Categorias';
  }, [])

  useEffect(() => {
    obterCategorias()

    async function obterCategorias() {
      setCarregandoCategorias(true)
      let url = `${BACKEND}/categorias`
      await fetch(url)
        .then(response => response.json())
        .then(data => {
          setCategorias(data)
          console.log('Dados das Categorias carregados com sucesso!')
        })
        .catch(function (error) {
          console.error('Houve um problema ao obter as categorias: ' + error.message)
          setErros({ 'dados': 'Não foi possível obter os dados das Categorias!' })
        })
      setCarregandoCategorias(false)
    }
  }, [])

  const alteraDadosCategoria = e => {
    setCategoria({ ...categoria, [e.target.name]: e.target.value })
    setErros({})
  };

  async function salvarCategoria(e) {
    e.preventDefault()
    // get our new errors
    const novosErros = validaErrosCategoria()
    // Existe algum erro no array?
    if (Object.keys(novosErros).length > 0) {
      // Sim, temos erros!
      setErros(novosErros)
    } else {
      const metodo = categoria._id === null ? 'POST' : 'PUT'
      categoria.status = categoria.status === true ? 'ativo': 'inativo'
      setSalvandoCategorias(true)
      let url = `${BACKEND}/categorias`
      await fetch(url, {
        mode: 'cors',
        method: metodo,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'access-token': token
        },
        body: JSON.stringify(categoria)
      }).then(response => response.json())
        .then(data => {
          console.log(data)
          setCategoria(valorInicial)
        })
        .catch(function (error) {
          console.error('Houve um problema ao salvar a categoria: ' + error.message);
        })
      setSalvandoCategorias(false)
    }
  }
  const validaErrosCategoria = () => {
    const { nome } = categoria
    const novosErros = {}
    // Validação no Nome
    if (!nome || nome === '') novosErros.nome = 'O nome não pode ser vazio!'
    else if (nome.length > 30) novosErros.nome = 'O nome informado é muito longo!'
    else if (nome.length < 3) novosErros.nome = 'O nome informado é muito curto!'
    return novosErros
  }


  return (
    <div>
      <Container fluid className='p-0'>
        <Cabecalho />
        <Row className="bg-info text-light" >
          <Col xs={12} lg={12} className='pt-2 pb-2'>
            <h3><MdRestaurantMenu />Categorias de Restaurantes</h3>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={6} className="pl-4">
            {/* Formulário */}
            <h4><MdWeb /> Cadastro das Categorias</h4>
            <Form method="POST">
              <Form.Group controlId="nomeCategoria">
                <Form.Label>Nome da Categoria</Form.Label>
                <Form.Control
                  name="nome"
                  placeholder="Ex: Churrascaria"
                  onChange={alteraDadosCategoria}
                  value={nome}
                  isInvalid={!!erros.nome}
                />
                <Form.Control.Feedback type='invalid'>
                  {erros.nome}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="status">
                <Form.Check type="checkbox" label="Ativo" name="status"
                  onChange={(e) => setCategoria({
                    ...categoria,
                    [e.target.name]: e.target.checked
                  })}
                  checked={status} />
              </Form.Group>

              <Button variant="primary" type="submit" title="Salvar o registro"
                onClick={(e) => salvarCategoria(e)}>
                {salvandoCategorias ? <Spinner animation="border" size="sm" /> : <MdSave />} Salvar
               </Button>
            </Form>
          </Col>
          <Col xs={12} lg={6}>
            {/* Listagem */}

            {erros.dados &&
              <Alert variant='danger'>
                <Alert.Heading>❌Ops... Ocorreu um erro</Alert.Heading>
                <p> Houve um problema ao tentar conectar ao servidor.<br></br>
                    Verifique se o <a href={BACKEND} target="_blank">servidor</a> está no ar!
                </p>
              </Alert>
            }
            {carregandoCategorias &&
              <>
                <Spinner animation="grow" size="sm" />
                <Spinner animation="grow" variant="info" />
                <p className="lead">Aguarde, enquanto os dados são carregados...</p>
              </>}
            {categorias.length > 0 &&
              <>
                <h4><MdStorage /> Listagem de Categorias</h4>
                <BootstrapTable keyField='_id' data={categorias} columns={colunas} pagination={paginationFactory(opcoesPaginacao)} />
              </>
            }
          </Col>
        </Row>
        <MensagemModal show={confirmaExclusao}
          titulo="Confirma a exclusão da categoria?"
          mensagem="‼️ Esta operação não poderá ser desfeita!" />
      </Container>
      <br></br><br></br>
      <Rodape />
    </div>
  )
}

export default Categorias;