import React from 'react';
import Button from "../common/Button";
import UserInfo from './UserInfo';
import TableFormat from './TableFormat';

const UserProfile = ({ profile, profileError, loading, username }) => {
    if (loading || !profile) {
        return null;
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
        <div className="content">
            <UserInfo user={profile.user} />
            <TableFormat data={[profile]}/>
        </div>
    );
};

export default UserProfile;