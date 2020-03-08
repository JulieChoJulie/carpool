import React from 'react';
import HeaderContainer from "../containers/common/HeaderContainer";
import SideMenuContainer from "../containers/common/SideMenuContainer";
import VerificationCodeContainer from '../containers/auth/VerificationCodeContainer';

const EmailVerificationPage = () => {
    return (
        <>
            <HeaderContainer />
            <div className="container">
                <SideMenuContainer/>
                <VerificationCodeContainer/>
            </div>
        </>
    );
};

export default EmailVerificationPage;