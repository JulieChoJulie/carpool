import React from 'react';
import Responsive from './Responsive';
import Button from './Button';
import './Header.scss';

const Header = () => {
    return (
        <>
            <div className="header">
                <Responsive addclass="wrapper">
                    <div className="logo">Carpool</div>
                    <div className="right">
                        <Button color="burgundy" to="/login">Login</Button>
                    </div>
                </Responsive>
            </div>
            <div className="spacer"></div>
        </>
    );
};

export default Header;