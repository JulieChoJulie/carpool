import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { initialize, getPost, getReservations, isReservations } from '../../modules/posts';
import { postSave, deleteSave } from "../../modules/categorize";
import Post from "../../components/postList/Post";
import ReservationsTemplate from "../../components/categorize/ReservationsTemplate";
import ErrorContainer from "../common/ErrorContainer";
import { withRouter } from 'react-router-dom';

const ReservationsContainer = () => {
    const dispatch = useDispatch();
    const {
        posts,
        status,
        loading,
        user,
        postsError,
    } = useSelector(({posts, loading, user}) => ({
        posts: posts.posts,
        status: posts.status,
        loading: loading['posts/GET_RESERVATIONS'],
        postsError: posts.postsError,
        user: user.user,
    }));

    useEffect(() => {
        dispatch(initialize())
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

    if (postsError) {
        return (
            <ReservationsTemplate user={user}>
                <ErrorContainer error={postsError}/>
            </ReservationsTemplate>
        )
    } else if (!posts || loading) {
        return null;
    } else {
        const requests = Array.isArray(posts[1]) && posts[1].length > 0 && posts[1];
        const confirmed = Array.isArray(posts[0]) && posts[0].length > 0 && posts[0];
        return (
            <>
                <ReservationsTemplate
                    user={user}
                >
                    <h2>My Confirmed Reservations</h2>
                    {confirmed ? confirmed.map((post, index) =>
                        <Post
                            user={user}
                            key={'confirmed' + index}
                            post={post}
                            status={status}
                            onToggleSave={onToggleSave}
                        />)
                        :
                        <div>No Reservations</div>
                    }
                    <h2>Reqeusts</h2>
                    {requests ? requests.map((post, index) =>
                        <Post
                            user={user}
                            key={'requests' + index}
                            post={post}
                            status={status}
                            onToggleSave={onToggleSave}
                        />)
                        :
                        <div>No Requests</div>
                    }
                </ReservationsTemplate>
            </>
        )
    }
}

export default withRouter(ReservationsContainer);