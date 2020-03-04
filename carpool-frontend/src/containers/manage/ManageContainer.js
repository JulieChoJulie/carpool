import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addPassenger,
    getMyPosts,
    cancelPassenger,
    cancelPassengerRequest,
    toggleActive
} from '../../modules/manage';
import { deletePost, deleteRide } from '../../lib/api/posts';
import ManageTemplate from "../../components/manage/ManageTemplate";
import Manage from "../../components/manage/Manage";
import { withRouter } from 'react-router-dom';
import ActiveMenu from "../../components/categorize/Reservations";

const ManageContainer = ({ history }) => {
    const dispatch = useDispatch();
    const {
        myPosts,
        myPostsError,
        user,
        loading,
        alarm,
        isActive
    } = useSelector(({ manage, user, loading, socketReducer, categorize }) => ({
        myPosts: manage.myPosts,
        myPostsError: manage.myPostsError,
        user: user,
        loading: loading['manage/GET_MYPOSTS'],
        alarm: socketReducer.alarm,
        isActive: manage.isActive,
    }));

    const onAccept = useCallback(async (rideId, userId) => {
        await dispatch(addPassenger({ rideId, userId }));
        setTimeout(() => {
            dispatch(getMyPosts());
        }, 500);
    }, [dispatch]);

    const onCancel = useCallback(async (rideId, userId) => {
        await dispatch(cancelPassenger({ rideId, userId }));
        setTimeout(() => {
            dispatch(getMyPosts());
        }, 500);
    }, [dispatch]);

    const onCancelRequest = useCallback(async (rideId, userId) => {
        await dispatch(cancelPassengerRequest({ rideId, userId }));
        setTimeout(() => {
            dispatch(getMyPosts());
        }, 500);
    }, [dispatch]);

    const onRemove = useCallback(async (id) => {
        try {
            await deletePost(id);
            dispatch(getMyPosts());
        } catch (e) {
            console.log(e);
        }
    },[dispatch]);

    const onRemoveRide = useCallback(async (postId, rideId) => {
        try {
            await deleteRide(postId, rideId);
            dispatch(getMyPosts());
        } catch (e) {
            console.log(e);
        }
    }, [dispatch]);

    const onToggleActive = useCallback((res) => {
        dispatch(toggleActive(res));
    }, [dispatch]);

    // when it's first mounted.
    useEffect(() => {
        dispatch(toggleActive(true));
        dispatch(getMyPosts());
    }, [dispatch]);

    // when the user receives the alarm
    useEffect(() => {
        if (alarm) {
            dispatch(getMyPosts());
        }
    }, [dispatch, alarm])

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
                isActive={isActive}
                onToggleActive={onToggleActive}
            />
        </ManageTemplate>
    );
};

export default withRouter(ManageContainer);