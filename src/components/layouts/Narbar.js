import React, { useContext } from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

const Narbar = () => {
    const { authState: { users: { username } }, logOut } = useContext(AuthContext)

    return (
        <>
           <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Hi { username } </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            </Navbar.Collapse>
                <Nav className="ml-auto">
                <Nav.Link as={Link} to="/dasboard">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <Button variant="info" onClick={() => logOut()}>Log out</Button>
                </Nav>
            </Navbar>
        </>
    )
}

export default Narbar
