import React from 'react';
import { NavLink, Route } from 'react-router-dom';
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
                    <div
                        className="closeButton"
                        onClick={onClick}>
                        <MdClose/>
                    </div>
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
                            <NavLink activeStyle={activeStyle} to="/1">
                                My Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeStyle={activeStyle} to="/1">
                                Notifications
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeStyle={activeStyle} to="/1">
                                Messages
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeStyle={activeStyle} to="/1">
                                Find Rides
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeStyle={activeStyle} to="/manage">
                                My Trips
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeStyle={activeStyle} to="/1">
                                My Rides
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeStyle={activeStyle} to="/1">
                                History
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeStyle={activeStyle} to="/1">
                                Save
                            </NavLink>
                        </li>
                    </ul>
                </div>) : null}

        </>
    );
};

export default SideMenu;