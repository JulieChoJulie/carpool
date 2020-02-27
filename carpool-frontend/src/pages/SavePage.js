import React from 'react';
import HeaderContainer from "../containers/common/HeaderContainer";
import SideMenuContainer from "../containers/common/SideMenuContainer";
import SaveContainer from "../containers/categorize/SaveContainer";

const SavePage = () => {
    return (
        <>
            <HeaderContainer />
            <div className="container">
                <SideMenuContainer/>
                <SaveContainer/>
            </div>
        </>
    );
};

export default SavePage;