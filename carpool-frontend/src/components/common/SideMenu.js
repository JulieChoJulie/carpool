import React from 'react';
import { NavLink } from 'react-router-dom';
import OutsideAlerter from './OnClickOutside';
import { MdClose, MdSettings } from 'react-icons/md';
import { FaHome } from 'react-icons/fa';
import classNames from 'classnames';
import './SideMenu.scss';

const SideMenu = ({ user, onClick, isMenuClosed, onLogout }) => {
    const activeStyle = {
        background: 'rgba(154, 87, 98, 0.3)',
        color: '#6c282f',
        fontWeight: 'bold',
        padding: '0.3rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        borderTopRightRadius: '20px',
        borderBottomRightRadius: '20px',
    };

    return (
        <>
            {user ? (
                <div className={classNames("sideMenu", { isMenuClosed })}>
                    <OutsideAlerter onClickOutside={onClick} isClosed={isMenuClosed}>
                    <ul>
                        <li className="firstList">
                            <div className="topSideMenu">
                                <div>
                                    <FaHome />
                                    <span className="username">{user.username}</span>
                                    <button onClick={onLogout}>Log out</button>
                                </div>
                                <span className="settings"><MdSettings/></span>
                            </div>
                        </li>
                        <li>
                            <NavLink activeStyle={activeStyle} exact to="/">
                                New Feed
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeStyle={activeStyle} to="/find-rides">
                                Filter Posts
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeStyle={activeStyle} to="/my-profile">
                                My Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeStyle={activeStyle} to={`/@${user.username}/notifications`}>
                                Notifications
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeStyle={activeStyle} to="/1">
                                Messages
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeStyle={activeStyle} to="/manage">
                                My Posts
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeStyle={activeStyle} to={`/@${user.username}/reservations`}>
                                My Reservations
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeStyle={activeStyle} to="/1">
                                History
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeStyle={activeStyle} to={`/@${user.username}/save`}>
                                Save
                            </NavLink>
                        </li>
                    </ul>
                    </OutsideAlerter>
                    <div
                        className="closeButton"
                        onClick={onClick}>
                        <MdClose/>
                    </div>
                </div>) : null}

        </>
    );
};

export default SideMenu;