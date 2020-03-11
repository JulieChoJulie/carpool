import React from 'react';
import ProfileEditContainer from "../containers/profile/ProfileEditContainer";
import HeaderContainer from "../containers/common/HeaderContainer";
import SideMenuContainer from "../containers/common/SideMenuContainer";


const ProfileEditPage = () => {
    return (
        <>
            <HeaderContainer />
            <div className="container">
                <SideMenuContainer/>
                <ProfileEditContainer/>
            </div>
        </>
    );
};

export default ProfileEditPage;