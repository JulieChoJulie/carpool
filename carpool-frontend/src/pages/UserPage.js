import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import UserContainer from '../containers/profile/UserContainer';
import SideMenuContainer from "../containers/common/SideMenuContainer";

const UserPage = () => {
    return (
        <>
            <HeaderContainer />
            <div className="container">
                <SideMenuContainer/>
                <UserContainer/>
            </div>
        </>
    );
};

export default UserPage;