import React, { useState } from 'react';
import './navbar.css';
import icon from '../assets/logout.png';

import {
    Navbar,
    NavbarBrand,
    Collapse,
    NavbarToggler,
    Nav,
    NavItem,
    Button
} from 'reactstrap';

const Sitebar = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        let newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
    }
    return(
        <Navbar className='nav' light expand='md'>
            <NavbarBrand href='/' className='brand'>My Concert Log</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className='ml-auto' navbar>
                            <NavItem className='logout' onClick={props.clickLogout}>> Logout</NavItem>
                        </Nav>
                    </Collapse>
        </Navbar>
    )
}

export default Sitebar; 