import React from 'react';
import Responsive from './Responsive';
import Button from './Button';
import './Header.scss';
import 'animate.css';
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaRegBell, FaBell } from 'react-icons/fa';
import classNames from "classnames";

const Header = ({ user, onLogout, isMenuClosed, onClick, alarm }) => {
    const { bounce, unread} = alarm;
    const menuButton = (
        <div
            className={classNames("menuButton", { isMenuClosed })}
            onClick={onClick}>
            <AiOutlineMenu/>
        </div>
    );


    return (
        <>
            <div className="header">
                <Responsive addclass="wrapper">
                    <Link to="/" className="logo">CARPOOL</Link>
                    {user ? (
                        <div className="right">
                            <div className="top-right">
                                <span className="username">{user.username}</span>
                                <span
                                    className={
                                        classNames('notification', 'animated', 'infinite', { bounce })
                                    }
                                >
                                    {unread ? <FaBell/> : <FaRegBell/>}
                                </span>
                                <span className="logout">
                                    <Button color="burgundy" onClick={onLogout}>Logout</Button>
                                </span>
                            </div>
                            { menuButton }
                        </div>
                    ): (
                        <div className="right">
                            <Button color="burgundy" to="/login">Login</Button>
                        </div>)
                    }
                </Responsive>
            </div>
            <div className="spacer"></div>
        </>
    );
};

export default Header;