import React from 'react';
import Ride from './Ride';
import './RideBlock.scss';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';
import { FiSend } from 'react-icons/fi'
import { GoTag } from 'react-icons/go';

const RideBlock = ({ ride, status, toggleRide }) => {
    const obj = {
        '0': ['Reserve', <MdCheckBoxOutlineBlank />],
        '-1': ['Sent', <FiSend/>],
        '1': ['Booked', <IoMdCheckboxOutline/>]
    };
    const isSoldout = status === 0 && ride.available === 0;
    return (
        <div className="rideBlock">
            <Ride ride={ ride } isSoldout={isSoldout} />
            {ride.available > 0 ?
                <div className="reserve" onClick={() => toggleRide(ride.id)}>
                    {obj[status][1]}
                    {obj[status][0]}
                </div> :
                <div className="reserve soldout">
                    <GoTag style={{ color: 'red'}}/>
                    Sold out
                </div>
            }
        </div>

    );
};

export default RideBlock;