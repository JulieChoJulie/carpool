import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onChange, onInsert, deleteComment, editComment } from '../../modules/post';
import Comments from '../../components/post/Comments';

const CommentContainer = () => {
    const dispatch = useDispatch();
    const { comments, postId, user, commentEdit, comment, loading } = useSelector(({ post, user, loading }) => ({
        comments: post.post.comments,
        postId: post.post.id,
        user: user.user,
        commentEdit: post.commentEdit,
        comment: post.comment,
        loading: loading['post/GET_POST']
    }));

    const onInsertInput = () => {
        dispatch(onInsert({ postId, content: comment }));
    };
    const onRemove = (commentId) => {
        dispatch(deleteComment({ postId, commentId }));
    };

    const onEditComment = (commentId, content) => {
        dispatch(editComment({ postId, commentId, content }));
    };
    const onChangeValue = (e) => {
        dispatch(onChange({ type: e.target.name, value: e.target.value }));
    };

    return (
      <Comments
          comments={comments}
          onInsert={onInsertInput}
          onEdit={onEditComment}
          onRemove={onRemove}
          onChange={onChangeValue}
          user={user}
          comment={comment}
          commentEdit={commentEdit}
          loading={loading}
      />
    );
};

export default CommentContainer;