import React from 'react';
import Logo from '../../lib/img/logo.png';
import { Link } from 'react-router-dom';
import './AuthFormTemplateBlock.scss';

const AuthFormTemplate = ({children}) => {
    return (
        <div className="templateBlock">
            <div className="box boxTemplate">
                <Link className="logo" to="/"><img src={Logo} alt="logo" /></Link>
                {children}
            </div>
        </div>
    );
};

export default AuthFormTemplate;