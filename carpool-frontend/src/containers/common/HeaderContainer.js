import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';
import { socketLogout } from '../../modules/socket';
import { switchAlarm } from '../../modules/socket';
import { menuToggle } from "../../modules/menu";
import NotificationBlock from "../../components/common/NotificationBlock";

const HeaderContainer = () => {
    const {user, isMenuClosed, notifications, alarm } = useSelector(({ user, menu, socketReducer }) => ({
        user: user.user,
        isMenuClosed: menu.isMenuClosed,
        notifications: socketReducer.notifications,
        alarm: socketReducer.alarm,
    }));

    const [unread, setUnread] = useState(false);
    const [isClosed, setClose] = useState(true);

    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(logout());
        dispatch(socketLogout());
    };

    const onClick = () => {
        dispatch(menuToggle());
    };

    const onClickBell = () => {
        setClose(!isClosed);
        setUnread(!unread);
        dispatch(switchAlarm(false))
    }

    const onClickOutside = () => {
        setClose(true);
        setUnread(false);
        dispatch(switchAlarm(false))
    }

    useEffect(() => {
        if(alarm) {
            setUnread(true);
            setClose(false);
            setTimeout(() => {
                dispatch(switchAlarm(false))
            }, 6500);
        }
    }, [alarm, dispatch]);

    return <>
        <Header
            user={user}
            onLogout={onLogout}
            onClick={onClick}
            isMenuClosed={isMenuClosed}
            alarm={{bounce: alarm, unread}}
            onClickBell={onClickBell}
            isClosed={isClosed}
        />
        { user && <NotificationBlock
            notifications={notifications}
            isClosed={isClosed}
            onClickOutside={onClickOutside}
            username={user.username}
        />}
    </>;
}

export default HeaderContainer;
