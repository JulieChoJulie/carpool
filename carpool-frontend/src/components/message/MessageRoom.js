import React from 'react';
import MessageChat from "./MessageChat";
import CommentInsert from "../post/CommentInsert";
import './MessageRoom.scss';
import ErrorContainer from "../../containers/common/ErrorContainer";

const MessageRoom = ({ room, user }) => {
    if (!room || room.users.length === 0) {
        return <ErrorContainer error="404"/>
    }

    const userList = room.users.map(u => {
        return '@' + u.username
    }).join(', ');

    return (
        <div className="room">
            <div className="userList">
                <label>Users:</label> {userList}
            </div>
            <div className="chats">
            { room.chats.map((chat, index) =>
                <MessageChat
                    key={index}
                    chat={chat}
                    user={user}
                />
            )}
            </div>
            <CommentInsert user={user} isChat={true}/>
        </div>
    );
};

export default MessageRoom;
