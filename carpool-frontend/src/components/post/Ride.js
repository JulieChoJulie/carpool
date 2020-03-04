import React from 'react';
import dateFormat from './dateFormat';
import classNames from 'classnames';
import './Ride.scss';

const Ride = ({ ride, isSoldout, status, isPast }) => {
    return (
        <div className={classNames('ride', { isSoldout }, { isPast })}>
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
    );
};

export default Ride;