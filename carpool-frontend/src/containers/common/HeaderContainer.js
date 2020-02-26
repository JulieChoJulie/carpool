import React, {useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';
import {menuToggle} from "../../modules/menu";
import NotificationBlock from "../../components/common/NotificationBlock";


const HeaderContainer = () => {
    const {user, isMenuClosed, notifications } = useSelector(({ user, menu, socketReducer }) => ({
        user: user.user,
        isMenuClosed: menu.isMenuClosed,
        notifications: socketReducer.notifications,
    }));

    const [bounce, setBounce] = useState(false);
    const [unread, setUnread] = useState(false);
    const [notiSave, setNotiSave] = useState([]);
    const [isClosed, setClose] = useState(true);

    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(logout());
    };

    const onClick = () => {
        dispatch(menuToggle());
    };

    const onClickBell = () => {
        setClose(!isClosed);
        setUnread(!unread);
    }

    const onClickOutside = () => {
        setClose(true);
        setUnread(false);
    }

    useEffect(() => {
        if (notifications.length > notiSave.length) {
            setBounce(true);
            setUnread(true);
            setTimeout(() => {
                setBounce(false);
            }, 6500);
            setNotiSave([...notifications]);
        }
    }, [notifications, notiSave]);

    return <>
        <Header
            user={user}
            onLogout={onLogout}
            onClick={onClick}
            isMenuClosed={isMenuClosed}
            alarm={{bounce, unread}}
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