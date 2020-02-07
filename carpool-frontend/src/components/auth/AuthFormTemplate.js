import React from 'react';
import { Link } from 'react-router-dom';
import './AuthFormTemplateBlock.scss';

const AuthFormTemplate = ({children}) => {
    return (
        <div className="templateBlock">
            <div className="box boxTemplate">
                <Link className="Logo" to="/">CARPOOL</Link>
                {children}
            </div>
        </div>
    );
};

export default AuthFormTemplate;