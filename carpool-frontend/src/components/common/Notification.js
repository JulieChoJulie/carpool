import React from 'react';
import dateFormat from "../post/dateFormat";

const Notification = ({ notification }) => {
    const { title, ride, username, from, date } = notification;
    const message = () => {
        if (from === 'writer') {
            switch (title) {
                case 'passenger_add':
                    if (ride.offering) {
                        return `@${username} has accepted your request for the ride: ${ride.from} -> ${ride.to}.`;
                    } else {
                        return `@${username} has confirmed to join your ride:  ${ride.from} -> ${ride.to}.`;
                    }
                    break;
                case 'passenger_cancel':
                    if (ride.offering) {
                        return `@${username} has canceled your reservation:  ${ride.from} -> ${ride.to}.`;
                    } else {
                        return `@${username} has canceled the offering:  ${ride.from} -> ${ride.to}.`;
                    }
                    break;
                default:
                    return ``;
            }
        } else {
            switch (title) {
                case 'request_add':
                    if (ride.offering) {
                        return `@${username} has requested to book the ride: ${ride.from} -> ${ride.to}.`;
                    } else {
                        return `@${username} has requested to offer you the ride:  ${ride.from} -> ${ride.to}.`;
                    }
                    break;
                case 'request_cancel':
                    if (ride.offering) {
                        return `@${username} has canceled the request for the ride: ${ride.from} -> ${ride.to}.`;
                    } else {
                        return `@${username} has canceled the offering request for the ride:  ${ride.from} -> ${ride.to}.`;
                    }
                    break;
                case 'passenger_cancel':
                    if (ride.offering) {
                        return `@${username} has canceled the reservation:  ${ride.from} -> ${ride.to}.`;
                    } else {
                        return `@${username} has canceled your ride:  ${ride.from} -> ${ride.to}.`;
                    }
                    break;
                default:
                    return ``;
            }
        }
    }

    return (
        <div className="notification">
            {message()}
            <div className="date">{dateFormat(date)}</div>
        </div>
    );
};

export default React.memo(Notification);