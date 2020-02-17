import React from 'react';
import Ride from './Ride';
import CancelButton from './CancleButton';
import './RideBlock.scss';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';
import { FiSend } from 'react-icons/fi'
import { GoTag } from 'react-icons/go';
import Button from "../common/Button";

const RideBlock = ({ isOwn, ride, status, toggleRide }) => {
    const obj = {
        '0': [
            'Reserve',
            <div className="reserve" onClick={() => toggleRide(ride.id)}>
                <MdCheckBoxOutlineBlank/>
                <span className="button">
                    <Button small color="white">Book</Button>
                    </span>
            </div>
            ],
        '-1': [
            'Sent',
            <CancelButton id={ride.id} onClick={toggleRide} status={status}/>
            ],
        '1': [
            'Booked',
            <CancelButton id={ride.id} onClick={toggleRide} status={status}/>

        ]
    };
    const isSoldout = status === 0 && ride.available === 0;
    return (
        <div className="rideBlock">
            <Ride ride={ ride } isSoldout={isSoldout} />
            {isOwn ? null :
                (ride.available > 0 ?
                    <>{obj[status][1]}</>:
                <div className="reserve soldout">
                    <GoTag style={{ color: 'red'}}/>
                    Sold out
                </div>
                )}
        </div>

    );
};

export default RideBlock;