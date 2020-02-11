import React from 'react';
import dateFormat from './dateFormat';
import './Ride.scss';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';
import { GoTag } from 'react-icons/go';
import classNames from 'classnames';

const Ride = ({ ride, ridePartners, toggleRide }) => {
    const isReserved = ridePartners.includes(ride.id);
    const isSoldout = !isReserved && ride.available === 0;
    return (
        <div className="rideBlock">
            <div className={classNames('ride', { isSoldout })}>
                <div className="cities item">
                    <span className="label">Where: </span>
                    {ride.from} <span className="label"> >> </span> {ride.to}
                </div>
                <div className="when item">
                    <span className="label">When: </span>{dateFormat(ride.when)}
                </div>
                <div className="seats item">
                    <span className="label">Seats:</span> { ride.available } &#47; {ride.seats}
                </div>
                <div className="price item">
                    <span className="label">Price</span>: $ {ride.price} &#47; seat
                </div>
            </div>
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

export default Ride;