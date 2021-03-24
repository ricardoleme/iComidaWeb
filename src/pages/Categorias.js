import React, { useEffect, useState } from "react";
import Cabecalho from './Cabecalho'
import Rodape from './Rodape'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { BACKEND, opcoesPaginacao } from '../constants'

import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'


import { MdRestaurantMenu, MdDeleteForever, MdModeEdit, MdStorage, MdWeb, MdSave } from 'react-icons/md'

const Inicio = () => {
  const [categorias, setCategorias] = React.useState([])
  const [carregandoCategorias, setCarregandoCategorias] = useState(false)
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
          <Button variant="outline-danger" title="Remover o registro">
            <MdDeleteForever />
          </Button>
        &nbsp;
          <Button variant="outline-primary" title="Editar o registro">
            <MdModeEdit />
          </Button>
        </>
      )
    }
  }
  ];


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
                <Form.Control type="text" placeholder="Ex: Churrascaria" />
              </Form.Group>
              <Form.Group controlId="status">
                <Form.Check type="checkbox" label="Ativo" checked />
              </Form.Group>
              <Button variant="primary" type="submit" title="Salvar o registro">
                <MdSave/> Salvar
               </Button>
            </Form>
          </Col>
          <Col xs={12} lg={6}>
            {/* Listagem */}
            {carregandoCategorias &&
              <>
                <Spinner animation="grow" size="sm" />
                <Spinner animation="grow" variant="info" />
              </>}
            {categorias &&
              <>
                <h4><MdStorage /> Listagem de Categorias</h4>
                <BootstrapTable keyField='_id' data={categorias} columns={colunas} pagination={paginationFactory(opcoesPaginacao)} />
              </>
            }
          </Col>
        </Row>
        <Rodape />
      </Container>
    </div>
  )
};

export default Inicio;