import React from 'react';

const Comment = ({ comment }) => {
    return (
        <div className="comment">
            {comment.user}
            <div className="content">{comment.cotent}</div>
        </div>

    );
};

export default Comment;