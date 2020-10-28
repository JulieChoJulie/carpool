import React from 'react';
import dateFormat from "../post/dateFormat";
import MessagePostHeader from "./MessagePostHeader";

const MessageRoomThumbnail = ({ room, onClick }) => {
    // const userList = room.MessageUsers.map(u => {
    //         return '@' + u.username
    //     }).join(', ');
    const chat = room.chats[0];
    const message = chat.chat.length > 50
        ? chat.chat.slice(0, 50) + '...'
        : chat.chat;
    return (
        <div className="messageRoomThumbnail" onClick={() => onClick(room.id)}>
            <MessagePostHeader rides={room.post.rides} onClickPost/>
            {/*<div className="userList">*/}
                {/*<label>Users:</label> {userList}*/}
            {/*</div>*/}
            <div className="message">
                <span className="user">{`@${chat.user.username}: `}</span>
                <span className="message-content">{message}</span>
                <span className="createdAt">{dateFormat(chat.createdAt)}</span>
            </div>
        </div>
    );
};

export default React.memo(MessageRoomThumbnail);
