import React, { useState } from 'react';
import Button from "../common/Button";
import AskRemoveModal from './AskRemoveModal';
import { MdClose } from 'react-icons/md';
import { MdCheckCircle } from 'react-icons/md';
import {Link} from "react-router-dom";

const Request = ({ request, onAccept, onCancelRequest }) => {
    const [visible, setVisible] = useState(false);
    const rideId = parseInt(request.Request.rideId);
    const userId = parseInt(request.Request.userId);
    const isVerified = request.isStudent
        && <span className="verified"><MdCheckCircle/></span>;

    return (
        <div className="user">
            <Link to={`/users/@${request.username}/profile`}>
                <span className="username">@{request.username}{isVerified}</span>
            </Link>
            <Button
                color="white"
                small
                onClick={() => onAccept(rideId, userId)}
            >
                Accept
            </Button>
            <span className="cancelBtn" onClick={() => {setVisible(true)}}><MdClose/></span>
            <AskRemoveModal
                visible={visible}
                onConfirm={() => {onCancelRequest(rideId, userId); setVisible(false)}}
                onCancel={() => {setVisible(false)}}
                obj="request"
            />
        </div>
    );
};

export default React.memo(Request);