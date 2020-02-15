import React from 'react';
import Responsive from './Responsive';
import Button from './Button';
import './Header.scss';
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import classNames from "classnames";

const Header = ({ user, onLogout, isMenuClosed, onClick}) => {
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
                            <div className="username">
                                <span>{user.username}</span>
                            <Button color="burgundy" onClick={onLogout}>Logout</Button>
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