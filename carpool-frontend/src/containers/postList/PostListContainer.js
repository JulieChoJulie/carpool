import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { readPosts } from '../../modules/posts';
import Post from "../../components/postList/Post";
import PostListTemplate from "../../components/postList/PostListTemplate";
import ErrorContainer from "../common/ErrorContainer";

const PostListContainer = () => {
    const dispatch = useDispatch();
    const { posts, status, loading, user, postsError } = useSelector(({ posts, loading, user }) => ({
        posts: posts.posts,
        status: posts.status,
        loading: loading['posts/READ_POSTS'],
        postsError: posts.postsError,
        user: user.user,
    }))

    useEffect(() => {
        dispatch(readPosts());
    }, [dispatch]);

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
            <PostListTemplate user={user}>
            {posts.map(post =>
                <Post key={post.id} user={user} post={post} status={status}/>)
            }
            </PostListTemplate>
        );
    }
};

export default PostListContainer;