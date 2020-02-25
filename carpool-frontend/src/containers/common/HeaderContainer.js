import React, {useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';
import {menuToggle} from "../../modules/menu";


const HeaderContainer = () => {
    const {user, isMenuClosed, notification } = useSelector(({ user, menu, socketReducer }) => ({
        user: user.user,
        isMenuClosed: menu.isMenuClosed,
        notification: socketReducer.notification,
    }));

    const [bounce, setBounce] = useState(false);
    const [unread, setUnread] = useState(false);
    const [notiSave, setNotiSave] = useState([]);

    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(logout());
    };

    const onClick = () => {
        dispatch(menuToggle());
    };

    useEffect(() => {
        console.log(notification);
        if (notification.length > notiSave.length) {
            setBounce(true);
            setUnread(true);
            setTimeout(() => {
                setBounce(false);
            }, 6500);
            setNotiSave([...notification]);
        }
    }, [notification, notiSave]);

    return <Header
        user={user}
        onLogout={onLogout}
        onClick={onClick}
        isMenuClosed={isMenuClosed}
        alarm={{bounce, unread}}
    />;
}

export default HeaderContainer;