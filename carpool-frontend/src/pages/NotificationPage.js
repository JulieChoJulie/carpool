import React from 'react';
import HeaderContainer from "../containers/common/HeaderContainer";
import NotificationContainer from "../containers/notification/NotificationContainer";
import SideMenuContainer from "../containers/common/SideMenuContainer";

const ManagePage = () => {
    return (
        <>
            <HeaderContainer/>
            <div className="container">
                <SideMenuContainer/>
                <NotificationContainer/>
            </div>
        </>
    );
};

export default ManagePage;