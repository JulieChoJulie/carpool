import React from 'react';
import Post from '../../components/post/Post';

const PostContainer = ({ post }) => {
    return (
        <Post post={post}/>
    );
};

export default PostContainer;