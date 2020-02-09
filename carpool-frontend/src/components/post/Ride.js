import React from 'react';
import { IoIosArrowRoundForward } from 'react-icons/io';

const Ride = ({ ride }) => {
    return (
        <div className="ride">
            <div className="cities">
                {ride.from}
                <IoIosArrowRoundForward/>
                {ride.to}
            </div>
            <div className="when">
                Leaving at {ride.when}
            </div>
            <div className="seats">
                Seats: {ride.available} &#47; {ride.seats}
            </div>
            <div className="price">
                Price: $ {ride.price} &#47; seat
            </div>
            <div className="details">
                {ride.details}
            </div>
        </div>
    );
};

export default Ride;