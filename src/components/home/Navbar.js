import '../../App.css';
import React, { Component } from 'react'; 
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Button
} from 'reactstrap';


class Sitebar extends Component {
    constructor(props) {  
        super(props);
        this.state = {
            isOpen: false
        };
    
}
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div id="navbar">
                <Navbar color="light"  light expand="md">
                    <NavbarBrand href="/">Shortcut</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}className="ml-auto" />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Button onClick={() => this.props.onLogout()}>Logout</Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Sitebar;