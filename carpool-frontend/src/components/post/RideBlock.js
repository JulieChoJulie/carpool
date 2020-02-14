import React from 'react';
import Ride from './Ride';
import './RideBlock.scss';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';
import { GoTag } from 'react-icons/go';

const RideBlock = ({ ride, ridePartners, toggleRide }) => {
    const isReserved = ridePartners.includes(ride.id);
    const isSoldout = !isReserved && ride.available === 0;
    return (
        <div className="rideBlock">
            <Ride ride={ ride } isSoldout={isSoldout} />
            {ride.available > 0 || isReserved ?
                <div className="reserve" onClick={() => toggleRide(ride.id, isReserved)}>
                    {isReserved ? <IoMdCheckboxOutline/> : <MdCheckBoxOutlineBlank/>}
                    {isReserved ? 'Reserved' : 'Reserve'}
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