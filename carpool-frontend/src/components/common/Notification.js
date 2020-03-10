import React from 'react';
import dateFormat from "../post/dateFormat";
import { Link } from 'react-router-dom';

const Notification = ({ notification }) => {
    const { title, ride, username, from, date } = notification;
    let postId;
    const message = () => {
        if (from === 'writer') {
            postId = ride.postId;
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
                case 'passenger_cancel_request':
                    return `@${username} has canceled your request: ${ride.from} -> ${ride.to}`;
                    break;
                default:
                    return ``;
            }
        } else if (from === 'requester') {
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
        } else if (from === 'commenter') {
            postId = ride.id;
            if (title === 'comment') {
                return `@${username} commented on your post.`
            }
        }
    }

    return (
        <Link className="notification" to={`/posts/${postId}`}>
            {message()}
            <div className="date">{dateFormat(date)}</div>
        </Link>
    );
};

export default React.memo(Notification);