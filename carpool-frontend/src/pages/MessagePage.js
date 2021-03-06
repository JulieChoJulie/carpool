import React from 'react';
import HeaderContainer from "../containers/common/HeaderContainer";
import SideMenuContainer from "../containers/common/SideMenuContainer";
import MessageRoomsContainer from "../containers/message/MessageRoomsContainer";

const MessagePage = () => {
    return (
        <>
            <HeaderContainer/>
            <div className="container">
                <SideMenuContainer/>
                <MessageRoomsContainer/>
            </div>
        </>
    );
};

export default MessagePage;
