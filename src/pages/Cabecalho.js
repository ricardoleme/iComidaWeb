import React from 'react'
import { useHistory } from "react-router-dom"

import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import { MdRestaurantMenu, MdDescription, MdStore, MdHome, MdMailOutline, MdLocalPizza } from 'react-icons/md'

const Cabecalho = () => {
    const history = useHistory() //redirecionar a página

    return (
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="#inicio"> <MdLocalPizza />iComida</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#inicio"><MdHome/> Início</Nav.Link>
                <Nav.Link href="#contato"><MdMailOutline/> Contato</Nav.Link>
                <DropdownButton
                    as={ButtonGroup}
                    menuAlign={{ lg: 'right' }}
                    title="Cadastros"
                    id="cadastros"
                >
                    <Dropdown.Item eventKey="1"><MdRestaurantMenu/> Categorias</Dropdown.Item>
                    <Dropdown.Item eventKey="2"><MdStore/> Restaurantes</Dropdown.Item>
                    <Dropdown.Item eventKey="2"><MdDescription/> Cardápios</Dropdown.Item>
                </DropdownButton>
            </Nav>
            <Button variant="outline-light" onClick={()=> {
                localStorage.removeItem('access_token')
                localStorage.removeItem('usuario')
                history.push("/inicio")
                }}>
                Logout
            </Button>
        </Navbar>
    )
};

export default Cabecalho;