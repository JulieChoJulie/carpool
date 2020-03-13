import React from 'react';
import Button from "../common/Button";
import UserInfo from './UserInfo';
import TableFormat from './TableFormat';
import ErrorContainer from "../../containers/common/ErrorContainer";

const UserProfile = ({
    profile,
    profileError,
    loading,
    username,
    error,
    isMyProfile,
    onClickMessage,
}) => {
    if (loading || !profile) {
        return null;
    }
    if (error) {
        return <ErrorContainer error="401"/>
    }

    if (profileError === 404) {
        return (
            <div className="content">
                No user with username, {username}
                <Button fullWidth color="burgundy">Go to homepage</Button>
            </div>
        )
    }

    return (
        <>
            <div className="content">
                <UserInfo user={profile.user} isMyProfile={isMyProfile} onClickMessage={onClickMessage}/>
                <TableFormat data={[profile]}/>
            </div>
        </>
    );
};

export default UserProfile;