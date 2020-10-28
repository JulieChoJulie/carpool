import React from 'react';
import HeaderContainer from "../containers/common/HeaderContainer";
import SideMenuContainer from "../containers/common/SideMenuContainer";
import MessageRoomContainer from "../containers/message/MessageRoomContainer";

const MessageRoomPage = () => {
    return (
        <>
            <HeaderContainer/>
            <div className="container">
                <SideMenuContainer/>
                <MessageRoomContainer/>
            </div>
        </>
    );
};

export default MessageRoomPage;
