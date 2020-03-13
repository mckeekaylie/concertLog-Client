import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

const Signin = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3001/user/signin', {
            method: 'POST',
            body: JSON.stringify({email: email, password: password}),
            headers: new Headers ({
                'Content-Type': 'application/json'
            })
        }) .then(
            (response) => response.json()
        ) .then((data) => {
            props.updateToken(data.sessionToken);
        })
    }

    return (
        <div className='signin'>
            <h1>Signin</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor='email'>Email</Label>
                    <Input placeholder='user@email.com' onChange = {(e) => setEmail(e.target.value)} name='email' value={email} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='password'>Password</Label>
                    <Input placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)} name='password' value={password} />
                </FormGroup>
                <Button className='signinUp'type='submit'>Signin</Button>
            </Form>
        </div>
    )


}

export default Signin;