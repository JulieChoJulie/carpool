import React from 'react';
import HeaderContainer from "../containers/common/HeaderContainer";
import SideMenuContainer from "../containers/common/SideMenuContainer";
import MessageContainer from "../containers/message/MessageContainer";

const MessagePage = () => {
    return (
        <>
            <HeaderContainer/>
            <div className="container">
                <SideMenuContainer/>
                <MessageContainer/>
            </div>
        </>
    );
};

export default MessagePage;