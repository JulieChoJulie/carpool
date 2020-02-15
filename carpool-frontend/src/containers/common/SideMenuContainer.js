import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { menuToggle } from '../../modules/menu';
import { logout } from '../../modules/user';
import SideMenu from '../../components/common/SideMenu';

const SideMenuContainer = () => {
    const dispatch = useDispatch();
    const { user, isMenuClosed } = useSelector(({ user, menu }) => ({
        user: user.user,
        isMenuClosed: menu.isMenuClosed
    }));

    const onClick = () => {
        dispatch(menuToggle());
    };

    const onLogout = () => {
        dispatch(logout());
        dispatch(menuToggle());
    };

    return <SideMenu
        user={user}
        isMenuClosed={isMenuClosed}
        onClick={onClick}
        onLogout={onLogout}/>
};

export default SideMenuContainer;