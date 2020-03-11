import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import Signup from './Signup';
import Signin from './Signin';
import './auth.css';


const Auth = (props) => {
    return (
       <Container>
            <h1 id='appTitle'>My Concert Log</h1>
        <Container>
            <Row className='authRow'>
                <Col className='signup'> 
                    <Signup updateToken={props.updateToken} />
                </Col>
                <Col className='signin'>
                    <Signin updateToken={props.updateToken}/>
                </Col>
             </Row>
        </Container>
    </Container> 
    )
}

export default Auth;