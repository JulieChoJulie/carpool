import React, { useState } from 'react';
import Comment from './Comment';
import CommentInsert from './CommentInsert';
import './Comments.scss';

const Comments = ({ comments, onInsert, onChange }) => {
    const [hide, setHide] = useState(comments.length > 1);
    const onClick = () => {
        setHide(false);
    }
    return (
        <>
            <div className="comments">Comments</div>
            { hide && comments[0] &&
                (<>
                    <Comment comment={comments[0]} />
                    <div className="comments hide" onClick={onClick}>
                        View {comments.length -1} more comments...
                    </div>
                </>)
            }
            {!hide &&
                comments.map((comment, index) =>
                    <Comment comment={comment} key={index}/>)
            }

            <CommentInsert onInsert={onInsert} onChange={onChange}/>

        </>
    );
};

export default Comments;