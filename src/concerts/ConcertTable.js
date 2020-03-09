import React, {useState} from 'react';
import {Table, Button} from 'reactstrap';
import edit from '../assets/edit.png';

const ConcertTable = (props) => {
    
    //display concert logs
    const concertMapper = () => {
        return props.concert.map((concert, index) => {
            return(
                <tr key={index}>
                    <td>{concert.date}</td>
                    <td>{concert.title}</td>
                    <td>{concert.bands}</td>
                    <td>{concert.venue}</td>
                    
                    <td>
                        <Button color='none' onClick={() => {props.editConcert(concert); props.modalOn()}}><img src={edit} style={editIconStyle} /></Button>
                    </td>
                </tr>
            )
        })
    }

    const editIconStyle = {
        width: '1.5em'
    }

    return(
        <>
            <h3>My Concert History</h3>
            <Table striped>
                <thead>
                    <tr> 
                        <th>Date</th>
                        <th>Title</th>
                        <th>Bands</th>
                        <th>Venue</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {concertMapper()}
                </tbody>
            </Table>
        </>
    )
 }

export default ConcertTable;