import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { readPosts, initialize, getSave, addUnsave, removeUnsave } from '../../modules/posts';
import { postSave, deleteSave } from "../../modules/categorize";
import Post from "../../components/postList/Post";
import PostListTemplate from "../../components/postList/PostListTemplate";
import ErrorContainer from "../common/ErrorContainer";
import { withRouter } from 'react-router-dom';

const PostListContainer = ({ match }) => {
    const isSavePage = match.params.username;
    const loadingKey = isSavePage ? 'posts/GET_SAVE' : 'posts/READ_POSTS'
    const dispatch = useDispatch();
    const {
        posts,
        status,
        loading,
        user,
        postsError,
        unsavedPostId
    } = useSelector(({ posts, loading, user }) => ({
        posts: posts.posts,
        status: posts.status,
        loading: loading[loadingKey],
        postsError: posts.postsError,
        user: user.user,
        unsavedPostId: posts.unsavedPostId,
    }));

    useEffect(() => {
        dispatch(initialize());
        if (isSavePage) {
            dispatch(getSave());
        } else {
            dispatch(readPosts());
        }
    }, [dispatch, isSavePage]);

    const noPost = (
        <ErrorContainer error={postsError}/>
    );

    const onToggleSave = useCallback((id) => {
        const isUnsaved = unsavedPostId.includes(id);
        if(isUnsaved) {
            dispatch(postSave(id));
            dispatch(removeUnsave(id));
        } else {
            dispatch(deleteSave(id));
            dispatch(addUnsave(id));
        }
    });

    if (!posts || loading) {
        return (
            <PostListTemplate user={user}>
                {noPost}
            </PostListTemplate>
            )
    } else if (isSavePage && posts.length === 0) {
        return (
            <PostListTemplate user={user} isSavePage={isSavePage}>
                You have not saved any posts.
            </PostListTemplate>
        )
    } else {
        return (
            <PostListTemplate
                user={user}
                isSavePage={isSavePage}
                postsError={postsError}
                loading={loading}
            >
            {posts.map(post =>
                <Post
                    key={post.id}
                    post={post}
                    status={status}
                    onToggleSave={onToggleSave}
                    unsavedPostId={unsavedPostId}
                    isSavePage={isSavePage}
                />)
            }
            </PostListTemplate>
        );
    }
};

export default withRouter(PostListContainer);