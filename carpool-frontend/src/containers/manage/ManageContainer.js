import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPassenger, getMyPosts, cancelPassenger } from '../../modules/manage';
import { deletePost } from '../../lib/api/posts';
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

    const onRemove = async (id) => {
        try {
            await deletePost(id);
            dispatch(getMyPosts());
        } catch (e) {
            console.log(e);
        }
    };

    const onEdit = () => {

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
                onRemove={onRemove}
            />
        </ManageTemplate>
    );
};

export default withRouter(ManageContainer);