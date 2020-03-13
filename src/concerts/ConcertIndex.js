import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'reactstrap';
import ConcertCreate from './ConcertCreate';
import ConcertEdit from './ConcertEdit';
import ConcertTable from './ConcertTable';
import BucketListIndex from '../bucketList/BucketListIndex';
import Sitebar from '../nav/navbar';
import './concerts.css';

const ConcertIndex = (props) => {
    const [concert, setConcert] = useState([]);
    const [concertToEdit, setConcertToEdit] = useState({});
    const [modalActive, setModalActive] = useState(false);

    // FETCHING CONCERTS
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

    // SETTING CONCERT TO EDIT
    const editConcert = (concert) => {
        setConcertToEdit(concert);
        console.log(concert);
    }

    // MODAL TOGGLE FUNCTIONS
    const modalOn = () => {
        setModalActive(true);
    }
    
    const modalOff = () => {
        setModalActive(false);
    }

    // CALLING FETCH CONCERTS
    useEffect(() => {
        fetchConcerts();
    }, [])

    // FUNCTION FOR DISPLAYING # OF BANDS SEEN
    const bandSumFunc = () => {
        let bandSum = 0;

        for(let i = 0; i < concert.length; i++){
            bandSum += concert[i].bands.length;
        }
        return bandSum;
    }

    return (
        <div>
            <Sitebar clickLogout={props.clearToken}/>
            <Container className='index'>
                <Row className='counterRow'>
                    <h1 className='bandConcertSumH1'>You have attended <span className='numColor'>{concert.length}</span> concerts and seen <span className='numColor'>{bandSumFunc()}</span> bands.</h1>
                </Row>
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
                    <Col>
                        <BucketListIndex token={props.token}/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}


export default ConcertIndex;