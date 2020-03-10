import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile } from '../../modules/profile';
import UserProfile from "../../components/profile/UserProfile";
import UserProfileTemplate from "../../components/profile/UserProfileTemplate";
import { withRouter } from 'react-router-dom';

const UserContainer = ({ location }) => {
    const username = location.pathname
        .split('/')
        .filter(a => a.includes('@'))[0]
        .slice(1);
    const dispatch = useDispatch();
    const { profile, profileError, loading } = useSelector(({ profile, loading }) => ({
        profile: profile.profile,
        profileError: profile.profileError,
        loading: loading['profile/GET_PROFILE']
    }));

    useEffect(() => {
        dispatch(getProfile(username));
    }, [dispatch]);


    return (
        <UserProfileTemplate>
            <UserProfile
                profile={profile}
                profileError={profileError}
                username={username}
                loading={loading}
            />
        </UserProfileTemplate>
    );
};

export default withRouter(UserContainer);