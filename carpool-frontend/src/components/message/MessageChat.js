import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import dateFormat from "../post/dateFormat";
import { MdCheckCircle } from 'react-icons/md';

const MessageChat = ({ chat, user }) => {
    const isMine = chat.user.username === user.username;
    const isGif = !!chat.gif;
    const isVerified = chat.user.isStudent
        && <span className="verified"><MdCheckCircle/></span>;

    return (
        <div className={classNames("chat", { isMine })}>
            <Link to={`/users/@${chat.user.username}/profile`}>
                <span className="username">
                    @{chat.user.username}
                    {isVerified}
                </span>
            </Link>
            <span className={classNames("messageContent", { isGif })}>
                {isGif ? chat.isGif : chat.chat}
                <div className="updatedAt">
                    {dateFormat(chat.updatedAt)}
                </div>
            </span>
        </div>
    );
};

export default React.memo(MessageChat);