import React from 'react';
import { Container, Row, Col, Modal } from 'reactstrap';
import Signup from './Signup';
import Login from './Login';
import './auth.css';

const Auth = (props) => {
    return (
            <Container fluid className='contCont'>
                <Container responsive style={{maxWidth: '70vw'}} className='auth-container'>
                    <Row className='row1'>
                        <Col md="6" >
                            <Signup setToken={props.setToken}/>
                        </Col>
                        <Col md="6" className='login-col'>
                            <Login setToken={props.setToken}/>
                        </Col>
                    </Row>
                </Container>
            </Container>
    )
}
export default Auth;

// class Auth extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state ={
//             modalIsOpen: false
//         }
//     }

//     toggleModal = () => {
//         this.setState({ modalIsOpen: !this.state.modalIsOpen })
//     }

//     render() {
//     return (
//             <Modal isOpen={this.props.modalIsOpen}>
//                 <Container className='auth-container'>
//                     <Row className='row1'>
//                         <Col md="6">
//                             <Signup setToken={this.props.setToken}/>
//                         </Col>
//                         <Col md="6" className='login-col'>
//                             <Login setToken={this.props.setToken}/>
//                         </Col>
//                     </Row>
//                 </Container>
//             </Modal>
//     )
//     }
// }
