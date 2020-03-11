import React, {useState, useEffect} from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

 const ConcertCreate = (props) => {
     const [date, setDate] = useState('');
     const [title, setTitle] = useState('');
     const [bands, setBands] = useState([]);
     const [venue, setVenue] = useState('');

     const handleSubmit = (e) => {
         e.preventDefault();
         let bandsList = bands.split(",")
         
         fetch('http://localhost:3001/log/concert', {
             method: 'POST',
             body: JSON.stringify({date: date, title: title, bands: bandsList, venue: venue}),
             headers: new Headers ({
                 'Content-Type': 'application/json',
                 'Authorization': props.token
             })
         }) .then((response) => response.json())
         .then((logData) => {
             console.log(logData);
             setDate('');
             setTitle('');
             setBands([]);
             setVenue('');
             props.fetchConcerts();
         })
     }

     return(
         <div className='logContainer'>
             <h3>Log a Concert</h3>
             <Form onSubmit={handleSubmit}>
                 <FormGroup>
                     <Input type='date' onChange={(e) => setDate(e.target.value)} name='date' value={date} />
                 </FormGroup>
                 <FormGroup>
                     <Input placeholder='Title' onChange={(e) => setTitle(e.target.value)} name='title' value={title} />
                 </FormGroup>
                 <FormGroup>
                     <Input placeholder='Bands' onChange={(e) => setBands(e.target.value)} name='bands' value={bands} />
                 </FormGroup>
                 <FormGroup>
                     <Input placeholder='Venue' onChange={(e) => setVenue(e.target.value)} name='venue' value={venue} />
                 </FormGroup>
                 <Button className='logConcert' type='submit'>Submit</Button>
             </Form>
         </div>
     )
 }

 export default ConcertCreate;