import React, { useEffect, useState } from "react";
import Cabecalho from './Cabecalho'
import Rodape from './Rodape'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import FormCheck from 'react-bootstrap/FormCheck'

import { BACKEND, opcoesPaginacao } from '../constants'
import MensagemModal from '../components/MensagemModal'

import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'

import { MdRestaurantMenu, MdDeleteForever, MdModeEdit, MdStorage, MdWeb, MdSave } from 'react-icons/md'

const Categorias = () => {
  const valorInicial = { _id: null, nome: '', status: 'inativo' }
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
        })
      setCarregandoCategorias(false)
    }
  }, [])

  const alteraDadosCategoria = e => {
    setCategoria({ ...categoria, [e.target.name]: e.target.value });
  };

  async function salvarCategoria() {
    const metodo = categoria._id === null ? 'POST' : 'PUT'
    alert(token)
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
      body: JSON.stringify({ categoria })
    }).then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch(function (error) {
        console.error('Houve um problema ao salvar a categoria: ' + error.message);
      })

    setSalvandoCategorias(false)
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
            <Form>
              <Form.Group controlId="nomeCategoria">
                <Form.Label>Nome da Categoria</Form.Label>
                <FormControl
                  name="nome"
                  placeholder="Ex: Churrascaria"
                  onChange={alteraDadosCategoria}
                  value={nome}
                />

              </Form.Group>
              <Form.Group controlId="status">
                <FormCheck type="checkbox" label="Ativo" name="status"
                  onChange={alteraDadosCategoria}
                  checked={status === 'ativo'} />
              </Form.Group>
              <Button variant="primary" type="submit" title="Salvar o registro"
                onClick={() => salvarCategoria()}>
                {salvandoCategorias ? <Spinner animation="border" size="sm" /> : <MdSave />} Salvar
               </Button>
            </Form>
          </Col>
          <Col xs={12} lg={6}>
            {/* Listagem */}
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