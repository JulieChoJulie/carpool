import React from 'react';
import dateFormat from "../post/dateFormat";
import "./MessagePostHeader.scss";

const MessagePostHeader = ({ rides, onClickPost }) => {
    return (
        <div className="messagePostHeader">
            {
                rides.map((ride, index) => (
                    <div className="messageRide">
                        <span className="city">{ride.from}</span>
                        <span className="arrow">>></span>
                        <span className="city">{ride.to}</span>
                        <span className="date">{dateFormat(ride.when)}</span>
                    </div>
                ))
            }

        </div>
    );
};

export default MessagePostHeader;
