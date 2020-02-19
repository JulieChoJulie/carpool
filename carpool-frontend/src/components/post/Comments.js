import React, { useState } from 'react';
import Comment from './Comment';
import CommentInsert from './CommentInsert';
import './Comments.scss';

const Comments = ({ loading, comments, onInsert, onChange, user, onEdit, onRemove, comment, commentEdit }) => {
    const [hide, setHide] = useState(comments.length > 1);
    const onClick = () => {
        setHide(false);
    };
    if (!comments || loading) {
        return null;
    }

    return (
        <>
            <div className="comments">Comments</div>
            { hide && comments[0] &&
                (<>
                    <Comment
                        comment={comments[0]}
                        key={comment[0].id}
                        user={user}
                        onEdit={onEdit}
                        onRemove={onRemove}
                        onChange={onChange}
                        commentEdit={commentEdit}
                    />
                        {comments.length > 1 &&
                        <div className="comments hide" onClick={onClick}>
                            View {comments.length -1} more comments...
                        </div>}
                </>)
            }
            {!hide &&
                comments.map((comment, index) =>
                    <Comment
                        comment={comment}
                        key={index}
                        user={user}
                        onEdit={onEdit}
                        onRemove={onRemove}
                        onChange={onChange}
                        commentEdit={commentEdit}
                    />)
            }

            <CommentInsert
                user={user}
                onInsert={onInsert}
                onChange={onChange
                } comment={comment}
            />
        </>
    );
};

export default React.memo(Comments);