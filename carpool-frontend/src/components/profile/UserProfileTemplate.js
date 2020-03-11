import React from 'react';
import './UserProfileTemplate.scss';

const UserProfileTemplate = ({ isMyProfile, children }) => {
    const myProfile = (
        <h2>My Profile</h2>
    )
    return (
        <div className="userProfileTemplate template">
            {isMyProfile && myProfile}
            {children}
        </div>
    );
};

export default UserProfileTemplate;