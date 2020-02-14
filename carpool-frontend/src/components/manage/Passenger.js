import React from 'react';
import Button from "../common/Button";

const Passenger = ({ passenger, onCancel }) => {
    const rideId = passenger.Partner !== undefined && parseInt(passenger.Partner.rideId);
    const userId = passenger.Partner !== undefined && parseInt(passenger.Partner.userId);
    return (
        <div className="user">
            <span className="username">@{passenger.username}</span>
            <Button
                color="white"
                small
                onClick={() => onCancel(rideId, userId)}
            >
                Cancel
            </Button>
        </div>
    );
};

export default React.memo(Passenger);