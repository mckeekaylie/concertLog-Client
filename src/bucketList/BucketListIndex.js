import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'reactstrap';
import BucketListTable from './BucketListTable';
import './bucketlist.css';

const BucketListIndex = (props) => {
    const [band, setBand] = useState([]);

    const fetchBucketList = () => {
        fetch('http://localhost:3001/bucketlist/band', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }) .then( (res) => res.json())
        .then((logData) => {
            console.log(logData)
            setBand(logData)
        })
    }

    useEffect(() => {
        fetchBucketList();
    }, [])
    
    return (
        <Container className='index'>
            <Row>
                <Col md='7'>
                    <BucketListTable band={band} fetchBucketList={fetchBucketList} token={props.token} />
                </Col>
            </Row>
        </Container>
    )
}


export default BucketListIndex;