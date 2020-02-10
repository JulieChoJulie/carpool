import React from 'react';
import dateFormat from './dateFormat';
import './Ride.scss';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';

const Ride = ({ ride, reserve}) => {
    return (
        <div className="rideBlock">
            <div className="ride">
                <div className="cities item">
                    <span className="label">Where: </span>
                    {ride.from} <span className="label"> >> </span> {ride.to}
                </div>
                <div className="when item">
                    <span className="label">When: </span>{dateFormat(ride.when)}
                </div>
                <div className="seats item">
                    <span className="label">Seats:</span> {ride.available} &#47; {ride.seats}
                </div>
                <div className="price item">
                    <span className="label">Price</span>: $ {ride.price} &#47; seat
                </div>
            </div>
            <div className="reserve">
                { reserve ? <IoMdCheckboxOutline/> : <MdCheckBoxOutlineBlank/> }
                { reserve ? 'Reserved' : 'Reserve' }
            </div>
        </div>

    );
};

export default Ride;