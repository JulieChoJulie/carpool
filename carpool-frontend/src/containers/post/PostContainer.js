import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../../components/post/Post';

const PostContainer = () => {
    const dispatch = useDispatch();
    const { post, postError, partners, partnersError, user } = useSelector(({ post, user }) => ({
        post: post.post,
        postError: post.postError,
        partners: post.partners,
        partnersError: post.partnersError,
        user: user.user,
    }))

    const reserve = (rideId) => {

    }

    return (
        <Post post={post} reserve={reserve}/>
    );
};

export default PostContainer;