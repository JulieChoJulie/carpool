import React from 'react';
import Button from "../common/Button";

const Request = ({ request, onAccept }) => {
    const rideId = parseInt(request.Request.rideId);
    const userId = parseInt(request.Request.userId);
    return (
        <div className="user">
            <span className="username">@{request.username}</span>
            <Button
                color="white"
                small
                onClick={() => onAccept(rideId, userId)}
            >
                Accept
            </Button>
        </div>
    );
};

export default React.memo(Request);