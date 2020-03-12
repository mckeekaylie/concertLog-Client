import React, {useState} from 'react';
import {Button, Form, FormGroup, Input} from 'reactstrap';

const BucketListTable = (props) => {

    // REMOVE A BAND FROM THE BUCKET LIST
    const deleteBand = (id) => {
        fetch(`http://localhost:3001/bucketlist/band/${id}`, {
            method: 'DELETE',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
             })
        })
            .then(() => {
                props.fetchBucketList();
            })
    }

    let deleteFunc = (id) => {
        deleteBand(id);
    }

    // SORT AND MAP BUCKET LIST BANDS
    const bucketListMapper = () => {
        const copyData = [].concat(props.band)
        .sort((a, b) => {
            if (a.bands > b.bands) {
                return 1;
            }

            if (b.bands > a.bands) {
                return -1;
            }
            return 0;
        })
        .map((band, index) => {
            return (
                <li key={index}>
                    {band.bands}
                    <Button className='redX' color='none' onClick={() => deleteFunc(band.id)}>X</Button>
                </li>
            )
        }) 
        return copyData
    }

    // ADD A BAND TO THE BUCKET LIST
    const BucketListCreate = () => {
        const [bands, setBands] = useState([]);

        /* WHAT HAPPENS WHEN THE ADD BAND FORM IS SUBMITTED */
        const handleSubmit = (e) => {
            e.preventDefault();
            let bandsList = bands.split(",");
   
            fetch('http://localhost:3001/bucketlist/band', {
                method: 'POST',
                body: JSON.stringify({bands: bandsList}),
                headers: new Headers ({
                    'Content-Type': 'application/json',
                    'Authorization': props.token
                })
            }) .then((response) => response.json())
            .then((logData) => {
                console.log(logData);
                setBands([]);
                props.fetchBucketList();
            })
        }

        return (
            <div className='bucketListCreate'>
                <h3>Add a band</h3>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Input placeholder='Band' onChange={(e) => setBands(e.target.value)} name='bands' value={bands} />
                    </FormGroup>
                    <Button className='bucketListSubmit' type='submit'>Submit</Button>
                </Form>
            </div>
        )
   
    }

    return(
        <div className ='bucketListWrapper'>
            <div className='bucketListHeader'>
                <h1>My Concert Bucket List</h1>
            </div>
            {BucketListCreate()}
            <hr></hr>
            <ul className='bandList'>
                {bucketListMapper()}
            </ul>
        </div>
    )

 }

export default BucketListTable;