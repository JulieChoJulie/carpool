import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {readPosts, initialize, getPost, getSave } from '../../modules/posts';
import { postSave, deleteSave } from "../../modules/categorize";
import Post from "../../components/postList/Post";
import PostListTemplate from "../../components/postList/PostListTemplate";
import ErrorContainer from "../common/ErrorContainer";
import { withRouter } from 'react-router-dom';

const PostListContainer = ({ location }) => {
    const isSavePage = location.pathname.includes('save');
    const loadingKey = isSavePage ? 'posts/GET_SAVE' : 'posts/READ_POSTS';
    const dispatch = useDispatch();
    const {
        posts,
        status,
        loading,
        user,
        postsError,
    } = useSelector(({ posts, loading, user, categorize }) => ({
        posts: posts.posts,
        status: posts.status,
        loading: loading[loadingKey],
        postsError: posts.postsError,
        user: user.user,
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

    const onToggleSave = useCallback((id, isSaved) => {
        if(!isSaved) {
            dispatch(postSave(id));
            setTimeout(() => dispatch(getPost(id)), 100);
        } else {
            dispatch(deleteSave(id));
            setTimeout(() => dispatch(getPost(id)), 100);
        }
    }, [dispatch]);


    const filterActive = useCallback((ride) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return new Date(ride.when) > today;

    });


    if (!posts || loading) {
        return (
            <PostListTemplate user={user} isSavePage={isSavePage}>
                {noPost}
            </PostListTemplate>
            )
    } else if (isSavePage && posts.length === 0) {
        return (
            <PostListTemplate user={user} isSavePage={isSavePage}>
                You have not saved any posts.
            </PostListTemplate>
        )
    }  else {
        return (
            <PostListTemplate
                user={user}
                isSavePage={isSavePage}
                postsError={postsError}
                loading={loading}
            >
            {posts.map(post => {
                if (Array.isArray(post)) return null;
                return <Post
                    user={user}
                    key={post.id}
                    post={post}
                    status={status}
                    onToggleSave={onToggleSave}
                    filterActive={filterActive}
                />
            })}
            </PostListTemplate>
        );
    }
};

export default withRouter(PostListContainer);