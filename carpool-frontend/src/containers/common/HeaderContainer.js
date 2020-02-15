import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';
import {menuToggle} from "../../modules/menu";


const HeaderContainer = () => {
    const {user, isMenuClosed } = useSelector(({ user, menu }) => ({
        user: user.user,
        isMenuClosed: menu.isMenuClosed
    }));

    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(logout());
    };

    const onClick = () => {
        dispatch(menuToggle());
    }

    return <Header
        user={user}
        onLogout={onLogout}
        onClick={onClick}
        isMenuClosed={isMenuClosed}/>;
}

export default HeaderContainer;