import React from 'react';
import Comments from '../../components/post/Comments';

const CommentContainer = ({ comments }) => {
    const onInsert = () => {

    }
    const onChange = () => {}
    return (
      <Comments comments={comments} onInsert={onInsert} onChange={onChange}/>
    );
};

export default CommentContainer;