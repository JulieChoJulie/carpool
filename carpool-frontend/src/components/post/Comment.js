import React from 'react';
import dateFormat from './dateFormat';
import './Comment.scss';

const Comment = ({ comment }) => {
    return (
        <div className="comment">
            <span className="username">@{comment.user.username} :</span>
            <span className="content">{comment.content}</span>
            <span className="date">{dateFormat(comment.updatedAt)}</span>
        </div>

    );
};

export default Comment;