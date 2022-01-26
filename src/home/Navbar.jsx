import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, Button, Container, Row, Col } from 'reactstrap';
import './Navbar.css'
import Auth from '../auth/Auth';

class SiteBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        if (this.props.sessionToken === localStorage.getItem('token')) {
            return (
                // container here????
                        <Navbar className='nav' color="faded" light expand="md" fluid>
                            <Col md={{ offset: '3', size: 'auto' }} sm="12">
                                <h1 className='fmr' href="/">Project FMR</h1>
                            </Col>
                            {/* <NavbarToggler className='toggler' onClick={this.toggle} /> */}
                            {/* <Collapse isOpen={this.state.isOpen} navbar> */}
                                <Nav navbar>
                                    {/* <NavItem> */}
                                        {/* row?? */}
                                            <Col md={{ offset: 1, size: 'auto' }} sm="12">
                                            <Button id='logOut' onClick={() => this.props.clickLogout()}>Log out</Button>
                                            </Col>
                                        {/* row?? */}
                                    {/* </NavItem> */}
                                </Nav>
                            {/* </Collapse> */}
                        </Navbar>
                // container here????
            )
        } else {
            return (
                <Navbar className='nav' color="faded" light expand="md">
                    <h1 className='fmr' href="/">Project FMR</h1>
                    {/* <Auth /> */}
                </Navbar>
            )
        }
    }
}
export default SiteBar;
