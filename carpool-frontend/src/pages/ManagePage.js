import React from 'react';
import HeaderContainer from "../containers/common/HeaderContainer";
import ManageContainer from "../containers/manage/ManageContainer";
import SideMenuContainer from "../containers/common/SideMenuContainer";

const ManagePage = () => {
    return (
        <>
            <HeaderContainer/>
            <div className="container">
                <SideMenuContainer/>
                <ManageContainer/>
            </div>
        </>
    );
};

export default ManagePage;