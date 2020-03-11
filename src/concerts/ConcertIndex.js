import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'reactstrap';
import ConcertCreate from './ConcertCreate';
import ConcertEdit from './ConcertEdit';
import ConcertTable from './ConcertTable';
import BucketListIndex from '../bucketList/BucketListIndex';
import './concerts.css';

const ConcertIndex = (props) => {
    const [concert, setConcert] = useState([]);
    const [concertToEdit, setConcertToEdit] = useState({});
    const [modalActive, setModalActive] = useState(false);

    const fetchConcerts = () => {
        fetch('http://localhost:3001/log/concert', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }) .then( (res) => res.json())
        .then((logData) => {
            console.log(logData)
            setConcert(logData)
        })
    }

        const editConcert = (concert) => {
            setConcertToEdit(concert);
            console.log(concert);
        }

        const modalOn = () => {
            setModalActive(true);
        }
    
        const modalOff = () => {
            setModalActive(false);
        }

        useEffect(() => {
            fetchConcerts();
        }, [])
    

    return (
        <Container className='index'>
            <Row>
                <Col md='9' className='table'>
                    <ConcertTable concert={concert} editConcert={editConcert} modalOn={modalOn} fetchConcerts={fetchConcerts} token={props.token} />
                </Col>
                <Col xs='3' className='create'>
                    <ConcertCreate fetchConcerts={fetchConcerts} token={props.token} />
                </Col>
                {modalActive ? <ConcertEdit concert={concert} concertToEdit={concertToEdit}
                modalOff={modalOff} token={props.token} fetchConcerts={fetchConcerts}/> : <></>}
            </Row>
            <Row>
                <Col md='9'>
                    <BucketListIndex token={props.token}/>
                </Col>
            </Row>
        </Container>
    )
}


export default ConcertIndex;