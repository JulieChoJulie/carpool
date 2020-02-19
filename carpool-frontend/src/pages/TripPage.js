import React from 'react';
import HeaderContainer from "../containers/common/HeaderContainer";
import SideMenuContainer from '../containers/common/SideMenuContainer';

const TripPage = () => {
    return (
        <>
            <HeaderContainer />
            <div className="container">
                <SideMenuContainer/>
                TripPage
            </div>
        </>
    );
};

export default TripPage;