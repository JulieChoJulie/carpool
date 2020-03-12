import React from 'react';
import dateFormat from "../post/dateFormat";

const MessageRoomThumbnail = ({ room }) => {
    const userList = room.MessageUsers.map(u => {
            return '@' + u.username
        }).join(', ');
    const message = room.lastMessage.length > 50
        ? room.lastMessage.slice(0, 50) + '...'
        : room.lastMessage;
    return (
        <div className="messageRoomThumbnail">
            <div className="userList">
                <label>Users:</label> {userList}
            </div>
            <div className="message">
                <span className="user">{`@${room.username}: `}</span>
                <span className="message-content">{message}</span>
                <span className="createdAt">{dateFormat(room.createdAt)}</span>
            </div>
        </div>
    );
};

export default React.memo(MessageRoomThumbnail);