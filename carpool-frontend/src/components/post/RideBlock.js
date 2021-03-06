import React from 'react';
import Ride from './Ride';
import CancelButton from './CancleButton';
import './RideBlock.scss';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';
import { GoTag } from 'react-icons/go';
import Button from "../common/Button";

const RideBlock = ({ isOwn, ride, status, toggleRide, user }) => {
    const isNotActive = () => {
        const now = new Date();
        if (new Date(ride.when) < now) {
            return true;
        } else {
            return false;
        }
    };

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

    const statusResult = () => {
        if (isOwn || !user || isNotActive()) {
            // when the post belongs to the user or
            // the user is not logged in
            return null;
        } else if (status === 1) {
            // if the user booked the ride whether the available seat is 0 or more.
            return obj[status][1]
        } else if (ride.available > 0) {
            // the user can sends a booking request or have a ride booking requested
            // only when the ride has availablitiy.
            if (obj.hasOwnProperty(status)) {
                return obj[status][1]
            }
        } else {
            // when the ride is full (sold out)
            return false;
        }
    };

    return (
        <div className="rideBlock">
            <Ride ride={ ride } isSoldout={isSoldout} isPast={isNotActive()}/>
            { statusResult()}
            {!statusResult() && statusResult() !== null &&
                <div className="reserve soldout">
                    <GoTag style={{ color: 'red'}}/>
                    Sold out
                </div>
            }
        </div>

    );
};

export default RideBlock;