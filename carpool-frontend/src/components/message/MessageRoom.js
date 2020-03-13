import React from 'react';
import MessageChat from "./MessageChat";
import CommentInsert from "../post/CommentInsert";
import './MessageRoom.scss';
import ErrorContainer from "../../containers/common/ErrorContainer";

const MessageRoom = ({ room, user }) => {
    if (user) {
        return <ErrorContainer status="401"/>
    }

    return (
        <div className="room">
            <div className="chats">
            { room.chat.map((chat, index) =>
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