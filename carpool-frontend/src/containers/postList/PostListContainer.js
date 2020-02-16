import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { readPosts } from '../../modules/posts';
import Post from "../../components/post/Post";

const PostListContainer = () => {
    const dispatch = useDispatch();
    const { posts, postsError, loading } = useSelector(({ posts, loading }) => ({
        posts: posts.posts,
        postsError: posts.postsError,
        loading: loading['posts/READ_POSTS']
    }))

    useEffect(() => {
        dispatch(readPosts());
    }, [dispatch]);

    return (
        <div className="containerContent">
            {JSON.stringify(posts)}
        </div>
    );
};

export default PostListContainer;