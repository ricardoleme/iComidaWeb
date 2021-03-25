import React from 'react'
import Navbar from 'react-bootstrap/Navbar'

import { MdLocalPizza } from 'react-icons/md'

const Rodape = () => {
    return (
        
        <Navbar bg="dark" fixed="bottom">
            <Navbar.Brand href="#home" className="text-light">
                <MdLocalPizza /> iComida&copy; - Todos os direitos reservados
            </Navbar.Brand>
        </Navbar>
        
    )
};
export default Rodape;