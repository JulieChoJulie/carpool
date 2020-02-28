import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPassenger, getMyPosts, cancelPassenger, cancelPassengerRequest } from '../../modules/manage';
import { deletePost, deleteRide } from '../../lib/api/posts';
import ManageTemplate from "../../components/manage/ManageTemplate";
import Manage from "../../components/manage/Manage";
import { withRouter } from 'react-router-dom';

const ManageContainer = ({ history }) => {
    const dispatch = useDispatch();
    const { myPosts, myPostsError, user, loading } = useSelector(({ manage, user, loading }) => ({
        myPosts: manage.myPosts,
        myPostsError: manage.myPostsError,
        user: user,
        loading: loading['manage/GET_MYPOSTS']
    }));

    const onAccept = useCallback((rideId, userId) => {
        dispatch(addPassenger({ rideId, userId }));
    }, [dispatch]);

    const onCancel = useCallback((rideId, userId) => {
        dispatch(cancelPassenger({ rideId, userId }));
    }, [dispatch]);

    const onCancelRequest = useCallback((rideId, userId) => {
        dispatch(cancelPassengerRequest({ rideId, userId }));
    }, [dispatch]);

    const onRemove = async (id) => {
        try {
            await deletePost(id);
            dispatch(getMyPosts());
        } catch (e) {
            console.log(e);
        }
    };

    const onRemoveRide = async (postId, rideId) => {
        try {
            await deleteRide(postId, rideId);
            dispatch(getMyPosts());
        } catch (e) {
            console.log(e);
        }
    };


    useEffect(() => {
        dispatch(getMyPosts());
    }, [dispatch]);

    useEffect(() => {
        if (myPostsError !== null && !!user) {
            history.push(`/error/${myPostsError.status}`);
        }
    }, [history, myPostsError, user]);

    return (
        <ManageTemplate>
            <Manage
                loading={loading}
                myPosts={myPosts}
                user={user}
                onAccept={onAccept}
                onCancel={onCancel}
                onCancelRequest={onCancelRequest}
                onRemove={onRemove}
                onRemoveRide={onRemoveRide}
            />
        </ManageTemplate>
    );
};

export default withRouter(ManageContainer);