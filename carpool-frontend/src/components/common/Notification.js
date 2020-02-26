import React from 'react';

const Notification = ({ notification }) => {
    const { title, ride, username } = notification;
    return (
        <div className="notification">
            {`@${username} has requested to book the ride: ${ride.from} -> ${ride.to}.`}
        </div>
    );
};

export default React.memo(Notification);