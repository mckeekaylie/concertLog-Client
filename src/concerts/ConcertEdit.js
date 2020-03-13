import React, {useState} from 'react';
import {Button, Form, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ConcertEdit = (props) => {
    const[editDate, setEditDate] = useState(props.concertToEdit.date);
    const[editTitle, setEditTitle] = useState(props.concertToEdit.title);
    const[editBands, setEditBands] = useState(props.concertToEdit.bands);
    const[editVenue, setEditVenue] = useState(props.concertToEdit.venue);

    // EDIT CONCERT
    const editConcert = (event, concert) => {
        event.preventDefault();
        fetch(`http://localhost:3001/log/concert/${props.concertToEdit.id}`, {
            method: 'PUT',
            body: JSON.stringify({date: editDate, title: editTitle, bands: [editBands], venue: editVenue}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }) .then((response) => {
            props.fetchConcerts();
            props.modalOff();
        })
    }

    // DELETE CONCERT
    const deleteConcert = () => {
        fetch(`http://localhost:3001/log/concert/${props.concertToEdit.id}`, {
            method: 'DELETE',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
             })
        })
            .then(() => {
                props.fetchConcerts();
                props.modalOff();
            })
    }

    // MODAL TOGGLE & STYLE
    const toggle = () => props.modalOff();

    const modalStyle = {
        color: 'black'
    }

    return(
        <Modal isOpen={true}>
            <ModalHeader toggle={toggle} charCode="X" style={modalStyle}> Edit Concert </ModalHeader>
            <ModalBody>
                <Form onSubmit={editConcert} className='editConcert'>
                    <FormGroup>
                        <Input type='date' placeholder='Date' name='date' value={editDate} onChange={(e) => setEditDate(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Input placeholder='Title' name='title' value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Input placeholder='Bands' name='bands' value={editBands} onChange={(e) => setEditBands(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Input placeholder='Venue' name='venue' value={editVenue} onChange={(e) => setEditVenue(e.target.value)} />
                    </FormGroup>
                  <Button type='submit'>Submit</Button>
                </Form>

                <ModalFooter>
                    <Button color='danger' onClick={() => {deleteConcert(props.concert)}}>Delete concert</Button>
                </ModalFooter>
            </ModalBody>
        </Modal>

    )
}

export default ConcertEdit;