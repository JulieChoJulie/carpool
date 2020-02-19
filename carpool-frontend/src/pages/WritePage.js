import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import WriteContainer from '../containers/write/WriteContainer';
import SideMenuContainer from "../containers/common/SideMenuContainer";

const WritePage = () => {
    return (
        <>
            <HeaderContainer />
            <div className="container">
                <SideMenuContainer/>
                <WriteContainer/>
            </div>
        </>
    );
};

export default WritePage;