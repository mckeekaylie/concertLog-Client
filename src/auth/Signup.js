import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

const Signup = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    /* THIS FUNCTION FIRES WHEN THE SIGNUP BUTTON IS CLICKED */
    let handleSubmit = (event) => {
        event.preventDefault();

        if(password.length < 8){
            alert('Your password is not 8 characters long.')
        } else {
            fetch('http://localhost:3001/user/signup', {
                method: 'POST',
                body: JSON.stringify( {email: email, password: password}),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }) .then((response) => response.json())
            
            .then((data) => {
                    props.updateToken(data.sessionToken)
            })
        }
    }

    return(
        <div className='signup'>
            <h1>Signup</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor='email'>Email <span className='disclaimer'>(For identification. You won't receive any emails.)</span></Label>
                    <Input placeholder='user@email.com' onChange={(e) => setEmail(e.target.value)} name='email' value={email} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='password'>Password <span className='disclaimer'>(MUST be at least 8 characters long)</span> </Label>
                    <Input placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)} name='password' value={password} />
                </FormGroup>
            <Button className='signinUp' type='submit'>Signup</Button>
            </Form>
        </div>

    )
}

export default Signup;