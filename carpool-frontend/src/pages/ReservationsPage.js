import React from 'react';
import HeaderContainer from "../containers/common/HeaderContainer";
import SideMenuContainer from '../containers/common/SideMenuContainer';
import ReservationsContainer from "../containers/categorize/ReservationsContainer";

const ReservationsPage = () => {
    console.log('reservation page')

    return (
        <>
            <HeaderContainer />
            <div className="container">
                <SideMenuContainer/>
                <ReservationsContainer/>
            </div>
        </>
    );
};

export default ReservationsPage;