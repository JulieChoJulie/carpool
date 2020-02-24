import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { readPosts } from '../../modules/posts';
import Post from "../../components/postList/Post";
import PostListTemplate from "../../components/postList/PostListTemplate";

const PostListContainer = () => {
    const dispatch = useDispatch();
    const { posts, status, loading, user } = useSelector(({ posts, loading, user }) => ({
        posts: posts.posts,
        status: posts.status,
        loading: loading['posts/READ_POSTS'],
        user: user.user,
    }))

    useEffect(() => {
        dispatch(readPosts());

    }, [dispatch]);

    if (!posts || loading) {
        return null
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