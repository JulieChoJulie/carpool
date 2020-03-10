import React from 'react';
import Button from "../common/Button";
import { MdCheckCircle } from 'react-icons/md';

const Passenger = ({ passenger, onCancel }) => {
    const rideId = passenger.Partner !== undefined && parseInt(passenger.Partner.rideId);
    const userId = passenger.Partner !== undefined && parseInt(passenger.Partner.userId);
    const isVerified = passenger.isStudent
        && <span className="verified"><MdCheckCircle/></span>;

    return (
        <div className="user">
            <span className="username">@{passenger.username}{isVerified}</span>
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