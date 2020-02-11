import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    getPost, unloadPost, getRidePartners, addRide, cancelRide
} from '../../modules/post';
// import { getRidePartners, addRide, cancelRide } from '../../modules/action';
import Post from '../../components/post/Post';

const PostContainer = ({ match }) => {
    const postId = match.params.id;
    const dispatch = useDispatch();
    const {
        post,
        postError,
        ridePartners,
        error,
        user,
        loading } = useSelector(
        ({ post, user, loading }) => ({
            post: post.post,
            postError: post.postError,
            ridePartners: post.ridePartners,
            error: [post.partnersError, post.toggleError],
            user: user.user,
            loading: loading['post/GET_POST'],
    }));

    const errorMsg = (error) => {
        if (error[0] !== null) {
            return '**Sorry. The system has failed to pull off your reservation status.**';
        }
        if (error[1] !== null) {
            if (error[1].status === 409) {
                return `**You've already ${error[1].type}ed the ride in your journey.**`;
            } else if (error[1].status === 401) {
                return `**You are not authorized to book a ride. Please log in first.**`;
            } else if (error[1].status === 403) {
                return `**The ride you chose is already fully booked.`
            }
        }
        return '';
    };

    const toggleRide = (rideId, isReserve) => {
        (!isReserve ?  dispatch(addRide(rideId)) : dispatch(cancelRide(rideId)));
    };

    useEffect(() => {
        dispatch(getPost(postId));
        if (user && user.id) {
            dispatch(getRidePartners());
        }
        return (() => {
            dispatch(unloadPost());
        })
    }, [dispatch, postId, user]);

    return (
        <Post post={post}
              ridePartners={ridePartners}
              loading={loading}
              postError={postError}
              error={error}
              toggleRide={toggleRide}
              user={user}
              errorMsg={errorMsg}
        />
    );
};

export default withRouter(PostContainer);