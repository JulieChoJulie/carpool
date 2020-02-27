import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { readPosts, initialize, getSave } from '../../modules/posts';
import Post from "../../components/postList/Post";
import PostListTemplate from "../../components/postList/PostListTemplate";
import ErrorContainer from "../common/ErrorContainer";
import { withRouter } from 'react-router-dom';

const PostListContainer = ({ match }) => {
    const isSavePage = match.params.username;
    const loadingKey = isSavePage ? 'posts/GET_SAVE' : 'posts/READ_POSTS'
    const dispatch = useDispatch();
    const { posts, status, loading, user, postsError } = useSelector(({ posts, loading, user }) => ({
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

    if (!posts || loading) {
        return (
            <PostListTemplate user={user}>
                {noPost}
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
                <Post key={post.id} user={user} post={post} status={status}/>)
            }
            </PostListTemplate>
        );
    }
};

export default withRouter(PostListContainer);