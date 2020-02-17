import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { readPosts } from '../../modules/posts';
import { getStatus } from '../../modules/post';
import Post from "../../components/postList/Post";
import PostListTemplate from "../../components/postList/PostListTemplate";

const PostListContainer = () => {
    const dispatch = useDispatch();
    const { posts, status, postsError, loading, user } = useSelector(({ posts, loading, user }) => ({
        posts: posts.posts,
        status: posts.status,
        postsError: posts.postsError,
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
            <div>
                <PostListTemplate username={user.username}>
                {posts.map(post =>
                    <Post key={post.id} user={user} post={post} status={status}/>)
                }
                </PostListTemplate>
            </div>
        );
    }
};

export default PostListContainer;