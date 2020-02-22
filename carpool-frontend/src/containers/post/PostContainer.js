import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    getPost, unloadPost, addRequest, cancelRequest, cancelRide, getStatus
} from '../../modules/post';
import { setOriginalPost } from "../../modules/write";
import Post from '../../components/post/Post';

const PostContainer = ({ match, history }) => {
    const postId = match.params.id;
    const dispatch = useDispatch();
    const {
        post,
        postError,
        status,
        error,
        user,
        loading } = useSelector(
        ({ post, user, loading }) => ({
            post: post.post,
            postError: post.postError,
            status: post.status,
            error: [post.statusError, post.toggleError],
            user: user.user,
            loading: loading['post/GET_POST'],
    }));
    const errorMsg = (error, user) => {
        if (error[0] !== null) {
            return '**Sorry. The system has failed to pull off your reservation status.**';
        }
        if (error[1] !== null) {
            if (error[1].status === 409) {
                return `**You've already ${error[1].type} the ride in your journey.**`;
            } else if (error[1].status === 401) {
                return `**You are not authorized to book a ride. Please log in first.**`;
            } else if (error[1].status === 403) {
                return `**The ride you chose is already fully booked.`
            } else if (error[1].status === 400) {
                return `**The ride is not registered to be ${error[1].type}.`
            } else {
                history.push(`/error/${error[1].status}`);
            }
        }
        if (!user) {
            return `**Please log in to book a ride.`;
        }
        return '';
    };

    const toggleRide = async (rideId) => {
        const rideStatus = status.hasOwnProperty(rideId.toString());
        // false => no request
        // 1 => booked
        // -1 => request sent
        if (rideStatus === false) {
            await dispatch(addRequest(rideId));
        } else if (status[rideId] === -1) {
            await dispatch(cancelRequest(rideId));
        } else if (status[rideId] === 1) {
            await dispatch(cancelRide(rideId));
        }
        await dispatch(getStatus());
    };

    const isOwn = user && post.user.id === user.id;

    const onEdit = () => {
        dispatch(setOriginalPost(post));
        history.push(`/posts/${post.id}/edit`);
    };

    useEffect(() => {
        dispatch(getPost(postId));
        if (user && user.id) {
            // get ride request status
            dispatch(getStatus());
        }
        return (() => {
            dispatch(unloadPost());
        })
    }, [dispatch, postId, user]);

    return (
        <Post post={post}
              status={status}
              loading={loading}
              postError={postError}
              error={error}
              toggleRide={toggleRide}
              errorMsg={errorMsg}
              isOwn={isOwn}
              onEdit={onEdit}
              loggedInUser={user}
        />
    );
};

export default withRouter(PostContainer);