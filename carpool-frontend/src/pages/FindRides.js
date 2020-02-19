import React from 'react';
import HeaderContainer from "../containers/common/HeaderContainer";
import SideMenuContainer from '../containers/common/SideMenuContainer';
import FindRidesContainer from "../containers/filter/FindRidesContainer";

const FindRides = () => {
    return (
        <div>
            <HeaderContainer />
            <div className="container">
                <SideMenuContainer/>
                <FindRidesContainer/>
            </div>
        </div>
    );
};

export default FindRides;