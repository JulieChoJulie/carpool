import React from 'react';
import HeaderContainer from "../containers/common/HeaderContainer";
import EditContainer from "../containers/edit/EditContainer";
import SideMenuContainer from "../containers/common/SideMenuContainer";

const EditPage = () => {
    return (
        <>
            <HeaderContainer />
            <div className="container">
                <SideMenuContainer/>
                <EditContainer/>
            </div>
        </>
    );
};

export default EditPage;