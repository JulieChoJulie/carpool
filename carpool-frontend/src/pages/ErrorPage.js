import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import ErrorContainer from "../containers/common/ErrorContainer";
import SideMenuContainer from "../containers/common/SideMenuContainer";

const ErrorPage = () => {
    return (
        <>
            <HeaderContainer />
            <div className="container">
                <SideMenuContainer/>
                <ErrorContainer/>
            </div>
        </>
    );
};

export default ErrorPage;