import React from 'react';
import Comment from '../../components/post/Comment';
import CommentInsert from '../../components/post/CommentInsert';

const CommentContainer = ({ comments, onInsert }) => {
    return (
        <>
            <CommentInsert onInsert={onInsert}/>
            <Comment comments={comments}/>
        </>
    );
};

export default CommentContainer;