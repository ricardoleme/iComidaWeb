import React, { useEffect, useState, useRef } from "react";
import Cabecalho from './Cabecalho'
import Rodape from './Rodape'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Image from 'react-bootstrap/Image'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Table from 'react-bootstrap/Table'

//React Time Ago - npm i react-time-ago (lembrar de adicionar imports ao index.js)
import ReactTimeAgo from 'react-time-ago'

import { BACKEND } from '../constants'
import MensagemModal from '../components/MensagemModal'
import Aviso from '../components/Aviso'

import {
  MdRestaurantMenu, MdDeleteForever, MdModeEdit, MdStorage,
  MdWeb, MdSave, MdFeedback, MdReplay
} from 'react-icons/md'

const Categorias = () => {
  const valorInicial = {
    nome: '',
    status: true,
    foto: {
      originalname: '',
      path: '',
      size: 0,
      mimetype: ''
    }
  }
  const [erros, setErros] = useState({})
  const [categoria, setCategoria] = useState(valorInicial)
  const [categorias, setCategorias] = useState([])
  const [carregandoCategorias, setCarregandoCategorias] = useState(false)
  const [salvandoCategorias, setSalvandoCategorias] = useState(false)
  const [confirmaExclusao, setConfirmaExclusao] = useState(false)
  const [aviso, setAviso] = useState('')
  const filesElement = useRef(null)
  const [progressoImagem, setProgressoImagem] = useState(0)
  const token = localStorage.getItem('access_token')
  const { nome, status } = categoria

  useEffect(() => {
    document.title = 'Cadastro de Categorias'
    obterCategorias()
  }, [])

  async function obterCategorias() {
    setCarregandoCategorias(true)
    let url = `${BACKEND}/categorias`
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCategorias(data)
        //console.log('Dados das Categorias carregados com sucesso!')
      })
      .catch(function (error) {
        //console.error('Houve um problema ao obter as categorias: ' + error.message)
        setErros({ 'dados': 'Não foi possível obter os dados das Categorias!' })
      })
    setCarregandoCategorias(false)
  }

  const alteraDadosCategoria = e => {
    setCategoria({ ...categoria, [e.target.name]: e.target.value })
    setErros({})
  }

  const selecaoImagem = e => {
    enviaArquivo(e)
  }

  const enviaArquivo = async (event) => {
    setErros({})
    setProgressoImagem(10)
    const dataForm = new FormData()
    for (const file of filesElement.current.files) {
      dataForm.append('file', file);
    }
    setProgressoImagem(30)
    const res = await fetch(`${BACKEND}/upload`, {
      method: 'POST',
      body: dataForm,
    })
    const data = await res.json();
    setProgressoImagem(100)

    const { originalname, path, size, mimetype } = data.files[0]
    setCategoria({
      ...categoria, foto: {
        originalname: originalname,
        path: path,
        size: size,
        mimetype: mimetype
      }
    })
    setProgressoImagem(0)

  }

  async function salvarCategoria(e) {
    e.preventDefault()
    const novosErros = validaErrosCategoria()
    // Existe algum erro no array?
    if (Object.keys(novosErros).length > 0) {
      // Sim, temos erros!
      setErros(novosErros)
    } else {
      const metodo = categoria.hasOwnProperty('_id') ? 'PUT' : 'POST'
      categoria.status = (categoria.status === true || categoria.status === 'ativo')  ? 'ativo' : 'inativo'
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
          (data._id || data.message) ? setAviso('Registro salvo com sucesso!') : setAviso('')
          obterCategorias()
          setCategoria(valorInicial)
          filesElement.current.value = null //limpa o botão de Imagem
        })
        .catch(function (error) {
          console.error('Houve um problema ao salvar a categoria: ' + error.message);
        })
      setSalvandoCategorias(false)
    }
  }

  async function excluirCategoria() {
    let url = `${BACKEND}/categorias/${categoria._id}`
    await fetch(url, {
      mode: 'cors',
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access-token': token
      }
    }).then(response => response.json())
      .then(data => {
        data.message ? setAviso(data.message) : setAviso('')
        setCategoria(valorInicial)
        obterCategorias()
      })
      .catch(function (error) {
        console.error('Houve um problema ao excluir a categoria: ' + error.message);
      })
  }

  const validaErrosCategoria = () => {
    const { nome, foto: { mimetype } } = categoria
    const novosErros = {}
    // Validação no Nome
    if (!nome || nome === '') novosErros.nome = 'O nome não pode ser vazio!'
    else if (nome.length > 30) novosErros.nome = 'O nome informado é muito longo!'
    else if (nome.length < 3) novosErros.nome = 'O nome informado é muito curto!'
    if (mimetype !== 'image/png') novosErros.foto = 'A foto é obrigatória e deve ser um arquivo PNG'
    return novosErros
  }

  function TabelaCategorias() {
    //Exemplo de Tabela com ordenação: https://codesandbox.io/s/table-sorting-example-ur2z9?from-embed
    //Componente mais profissional: https://react-bootstrap-table.github.io/react-bootstrap-table2/
    const dados = categorias
    return (
      <Table striped bordered hover>
        <caption>Total de Categorias: {categorias.length}</caption>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Status</th>
            <th>Ícone</th>
            <th>Inclusão</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {dados.map(item => (
            <tr key={item._id}>
              <td>{item.nome}</td>
              <td>{item.status}</td>
              <td> <Image src={`${BACKEND}/${item.foto.path}`} thumbnail 
                          width="50" height="50" title={item.foto.originalname} 
                          alt={item.foto.originalname} /></td>
              <td><ReactTimeAgo date={item.createdAt} /></td>
              <td>
                <Button variant="outline-danger" title="Remover o registro" onClick={() => {
                        setCategoria(item)
                        setConfirmaExclusao(true)
                }}>
                <MdDeleteForever />
                </Button>
                &nbsp;
                <Button variant="outline-primary" title="Editar o registro" 
                        onClick={() => setCategoria(item)}>
                  <MdModeEdit />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
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
            <h4><MdWeb /> Cadastro das Categorias </h4>
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
              <Form.Group controlId="imagem">
                <Form.Label>Foto da Categoria:</Form.Label>
                {categoria.foto && categoria.foto.size > 0
                  ? <Image src={`${BACKEND}/${categoria.foto.path}`} thumbnail
                    width="50" title={categoria.foto.originalname}
                    alt={categoria.foto.originalname} />
                  : <small className="text-info"> Ainda não foi feito o upload de nenhuma foto</small>
                }
                <Form.Control type="file" ref={filesElement} onChange={selecaoImagem}
                  onClick={e => (e.target.value = null)}
                  accept="image/png" isInvalid={!!erros.foto} />
                <Form.Control.Feedback type='invalid'>
                  {erros.foto}
                </Form.Control.Feedback>
              </Form.Group>
              {progressoImagem > 0 && <ProgressBar animated now={progressoImagem} label={`${progressoImagem}%`} />}

              <Button variant="primary" type="submit" title="Salvar o registro"
                onClick={(e) => salvarCategoria(e)}>
                {salvandoCategorias ? <Spinner animation="border" size="sm" /> : <MdSave />} Salvar
               </Button>
               &nbsp;
               <Button variant="danger" type="button" title="Cancelar"
                onClick={() => {
                              setCategoria(valorInicial)
                              filesElement.current.value = null 
                              }}>
                 <MdReplay /> Cancelar
               </Button>
            </Form>
            <Aviso
              mostrar={aviso.length > 0}
              setAviso={setAviso}
              titulo="iComida"
              mensagem={aviso} />
          </Col>
          <Col xs={12} lg={6}>
            {/* Listagem */}

            {erros.dados &&
              <Alert variant='danger'>
                <Alert.Heading>❌Ops... Ocorreu um erro</Alert.Heading>
                <p> Houve um problema ao tentar conectar ao servidor.<br></br>
                    Verifique se o <a href={BACKEND} target="_blank" rel="noreferrer">servidor</a> está no ar!
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
                {TabelaCategorias()}
              </>
            }
            {categorias.length === 0 && !carregandoCategorias &&
              <>
                <h4><MdFeedback /> Ainda não há nenhuma categoria cadastrada.</h4>

              </>
            }
          </Col>
        </Row>
        <MensagemModal
          mostrar={confirmaExclusao}
          setConfirmaExclusao={setConfirmaExclusao}
          excluir={excluirCategoria}
          registro={categoria}
          titulo="Confirma a exclusão da categoria?"
          mensagem="‼️ Esta operação não poderá ser desfeita!" />
      </Container>
      <br></br><br></br>
      <Rodape />
    </div>
  )
}

export default Categorias;