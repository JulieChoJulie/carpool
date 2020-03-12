import React from 'react';
import MessageChat from "./MessageChat";
import CommentInsert from "../post/CommentInsert";
import './MessageRoom.scss';

const MessageRoom = ({ room, user }) => {
    return (
        <div className="room">
            <div className="chats">
            { room.chat.map(chat =>
                <MessageChat
                    key={chat.id}
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