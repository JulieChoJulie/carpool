import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { initialize, getPost, getReservations, isReservations } from '../../modules/posts';
import { postSave, deleteSave, toggleActive } from "../../modules/categorize";
import { withRouter } from 'react-router-dom';
import Reservations from "../../components/categorize/Reservations";

const ReservationsContainer = () => {
    const dispatch = useDispatch();
    const {
        posts,
        history,
        status,
        loading,
        user,
        postsError,
        isActive,
    } = useSelector(({posts, loading, user, categorize }) => ({
        posts: posts.posts,
        history: posts.history,
        status: posts.status,
        loading: loading['posts/GET_RESERVATIONS'],
        postsError: posts.postsError,
        user: user.user,
        isActive: categorize.isActive
    }));

    useEffect(() => {
        dispatch(initialize());
        dispatch(toggleActive(true));
        dispatch(getReservations());
        dispatch(isReservations(true));
    }, [dispatch]);

    const onToggleSave = useCallback((id, isSaved) => {
        if (!isSaved) {
            dispatch(postSave(id));
            setTimeout(() => dispatch(getPost(id)), 100);
        } else {
            dispatch(deleteSave(id));
            setTimeout(() => dispatch(getPost(id)), 100);
        }
    }, [dispatch]);

    const onToggleActive = useCallback((res) => {
        dispatch(toggleActive(res));
    }, [dispatch]);

    const filterActive = (ride) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return new Date(ride.when) >= today;
    };

    return (
        <Reservations
            onToggleSave={onToggleSave}
            filterActive={filterActive}
            postsError={postsError}
            user={user}
            posts={posts}
            loading={loading}
            onToggleActive={onToggleActive}
            isActive={isActive}
            history={history}
            status={status}
        />
    )
}

export default withRouter(ReservationsContainer);