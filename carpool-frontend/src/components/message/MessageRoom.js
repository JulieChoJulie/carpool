import React from 'react';
import MessagePostHeader from "./MessagePostHeader"
import MessageChat from "./MessageChat";
import CommentInsert from "../post/CommentInsert";
import './MessageRoom.scss';
import ErrorContainer from "../../containers/common/ErrorContainer";
import { BsArrowLeft } from "react-icons/bs";
import { MdDelete } from 'react-icons/md';



const MessageRoom = ({ room, user, onClickUser, onClickBack, onClickDelete }) => {
    if (!room || room.users.length === 0) {
        return <ErrorContainer error="404"/>
    }

    const userList = room.users.map(u =>
        (<span key={u.id} className="username" onClick={() => onClickUser(u.username)}>@{u.username}</span>)
    );

    return (
        <div className="room">
            <div className="menu">
                <span className="icon" onClick={onClickBack}><BsArrowLeft size={32} /></span>
                <span className="icon end" onClick={onClickDelete}><MdDelete size={32} /></span>
            </div>
            <div className="userList">
                <label>Users:</label> {userList}
            </div>
            <MessagePostHeader rides={room.rides} messageRoom={true}/>
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
