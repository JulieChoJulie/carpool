import React, { useState } from 'react';
import dateFormat from './dateFormat';
import { MdSend } from 'react-icons/md';
import './Comment.scss';

const Comment = ({ comment, user, onEdit, onRemove, commentEdit, onChange }) => {
    const [isEditing, setEditing] = useState(false);
    if (!comment) {
        return null;
    }
    const onClickEdit = () => {
        setEditing(true);
        onChange({ target: { name: 'commentEdit', value: comment.content }})
    };

    return (
        <div className="comment">
            <div className="info">
            <span className="username">@{comment.user.username} :</span>
            {!isEditing &&
                <><span className="content">{comment.content}</span>
                <span className="date">{dateFormat(comment.updatedAt)}</span></>
            }
            {isEditing &&
                <form
                    onSubmit={() => {onEdit(comment.id, commentEdit); setEditing(false)}}
                    className='editing'
                >
                    <input
                        className="content"
                        name="commentEdit"
                        value={commentEdit}
                        onChange={onChange}
                    />
                    <MdSend onClick={() => {onEdit(comment.id, commentEdit); setEditing(false)}}/>
                </form>
            }
            </div>
            {user && user.id === comment.user.id && !isEditing
                && (<div className="buttons">
                    <span className="btn" onClick={onClickEdit}>Edit</span>
                    <span className="btn" onClick={() => onRemove(comment.id)}>Delete</span>
                    </div>)
            }
        </div>


    );
};

export default React.memo(Comment);