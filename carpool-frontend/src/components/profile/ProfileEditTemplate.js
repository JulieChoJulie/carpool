import React from 'react';

const ProfileEditTemplate = ({ children }) => {
    return (
        <div className="profileEditTemplate template">
            <h2>Edit My Profile</h2>
            { children }
        </div>
    );
};

export default ProfileEditTemplate;