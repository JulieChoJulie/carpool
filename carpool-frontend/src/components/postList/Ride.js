import React from 'react';
import './Ride.scss';
import { FiSend } from 'react-icons/fi';
import { IoMdCheckboxOutline } from 'react-icons/io';
import dateFormat from "../post/dateFormat";
import classNames from 'classnames';

const Ride = ({ ride, status }) => {

    const keyArr = Object.keys(status);
    const isRideSelected = keyArr.includes(ride.id.toString());
    const reservation = isRideSelected ? status[ride.id] : 0;
    const obj = {
        '-1': ['Sent', <FiSend/>],
        '1': ['Booked', <IoMdCheckboxOutline/>]
    };

    return (
        <div className={classNames("rideBlock", {reservation})}>
            <div className="firstRow">
            <span className="status">{isRideSelected && obj[status[ride.id]][1]}</span>
            <span className="where">{ride.from} >> {ride.to}</span>
            </div>
            <span className="when">{dateFormat(ride.when)}</span>
            <span className="price">${ride.price}/seats</span>
            <span className="available">{ride.available} seats left</span>
        </div>
    );
};

export default React.memo(Ride);