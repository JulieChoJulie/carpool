import React from 'react';
import Responsive from './Responsive';
import Button from './Button';
import './Header.scss';
import { Link } from 'react-router-dom';

const Header = ({ user, onLogout}) => {
    return (
        <>
            <div className="header">
                <Responsive addclass="wrapper">
                    <Link to="/" className="logo">CARPOOL</Link>
                    {user ? (
                        <div className="right">
                            <Button color="burgundy" onClick={onLogout}>Logout</Button>
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