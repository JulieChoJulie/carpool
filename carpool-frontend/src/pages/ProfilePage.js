import React from 'react';
import HeaderContainer from "../containers/common/HeaderContainer";
import SideMenuContainer from "../containers/common/SideMenuContainer";

const ProfilePage = () => {
    return (
        <>
            <HeaderContainer/>
            <div className="container">
                <SideMenuContainer/>
                ProfilePage
            </div>
        </>
    );
}

export default ProfilePage;