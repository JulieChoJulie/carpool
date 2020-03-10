import React from 'react';
import './UserProfileTemplate.scss';

const UserProfileTemplate = ({ children }) => {
    return (
        <div className="userProfileTemplate template">
            {children}
        </div>
    );
};

export default UserProfileTemplate;