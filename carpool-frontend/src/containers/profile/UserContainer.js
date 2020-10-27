import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile } from '../../modules/profile';
import { createRoom, initializeField } from "../../modules/message";
import UserProfile from "../../components/profile/UserProfile";
import UserProfileTemplate from "../../components/profile/UserProfileTemplate";
import { withRouter } from 'react-router-dom';

const UserContainer = ({ location, history }) => {
    const dispatch = useDispatch();
    const {
        profile,
        profileError,
        loading,
        user,
        roomId
    } = useSelector(({ profile, loading, user, message }) => ({
        profile: profile.profile,
        profileError: profile.profileError,
        loading: loading['profile/GET_PROFILE'],
        user: user.user,
        roomId: message.roomId,
    }));
    const [error, setError] = useState(false);

    const onClickMessage = useCallback(({ userId, rideId })=> {
        dispatch(createRoom({ userId, rideId }));
    }, [dispatch]);

    const isMyProfile = location.pathname.includes('my-profile');
    let username = null;
    if (!isMyProfile) {
        username = location.pathname
            .split('/')
            .filter(a => a.includes('@'))[0]
            .slice(1);
    } else {
        if (user) {
            username = user.username;
        }
    }

    useEffect(() => {
        setError(false);
        dispatch(initializeField('roomId'));
        dispatch(getProfile(username));
    }, [dispatch, username]);

    useEffect(() => {
        if (roomId) {
            history.push(`/message/room/${roomId}`);
        }
    }, [roomId, history]);

    useEffect(() => {
        if (!user) {
            history.push('/');
        }
    }, [user, history]);

    return (
        <UserProfileTemplate isMyProfile={isMyProfile}>
            <UserProfile
                profile={profile}
                isMyProfile={isMyProfile}
                profileError={profileError}
                username={username}
                loading={loading}
                error={error}
                onClickMessage={onClickMessage}
            />
        </UserProfileTemplate>
    );
};

export default withRouter(UserContainer);
