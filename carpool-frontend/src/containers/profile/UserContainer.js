import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile } from '../../modules/profile';
import UserProfile from "../../components/profile/UserProfile";
import UserProfileTemplate from "../../components/profile/UserProfileTemplate";
import { withRouter } from 'react-router-dom';

const UserContainer = ({ location }) => {
    const dispatch = useDispatch();
    const {
        profile,
        profileError,
        loading,
        user
    } = useSelector(({ profile, loading, user }) => ({
        profile: profile.profile,
        profileError: profile.profileError,
        loading: loading['profile/GET_PROFILE'],
        user: user.user,
    }));
    const [error, setError] = useState(false);

    const isMyProfile = location.pathname.includes('my-profile');
    let username = null;

    useEffect(() => {
        setError(false);
        if (!isMyProfile) {
            username = location.pathname
                .split('/')
                .filter(a => a.includes('@'))[0]
                .slice(1);
        } else {
            if (user) {
                username = user.username;
            } else {
                setError(true);
            }
        }
        dispatch(getProfile(username));
    }, [dispatch, user]);


    return (
        <UserProfileTemplate isMyProfile={isMyProfile}>
            <UserProfile
                profile={profile}
                isMyProfile={isMyProfile}
                profileError={profileError}
                username={username}
                loading={loading}
                error={error}
            />
        </UserProfileTemplate>
    );
};

export default withRouter(UserContainer);