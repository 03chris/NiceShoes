import { Nav, Container, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import CartWidget from '../Cart/CartWidget'

function NavBar() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="black" variant="dark" sticky="top">
            <Container fluid>
                <div><Link className="navbar-brand" to={`/`}>NiceShoes</Link></div>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <div><Link className="nav-link" to={`/categories/unisex`}>Unisex</Link></div>
                        <div><Link className="nav-link" to={`/categories/men`}>Men</Link></div>
                        <div><Link className="nav-link" to={`/categories/woman`}>Woman</Link></div>
                    </Nav>
                    <Nav>
                        <div><Link className="nav-link" to={`/`}>Home</Link></div>
                        <div><Link className="nav-link" to={`/all`}>Shop</Link></div>
                        <div><Link className="nav-link" to={`/cart`}><CartWidget/></Link></div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar



