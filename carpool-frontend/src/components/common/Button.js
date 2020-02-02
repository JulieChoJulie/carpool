import React from 'react';
import './Button.scss';
import classNames from 'classnames';

const Button = ({ color, fullWidth, children}) => {
    return (
        <div>
            <button className={
                classNames('Button', color , { fullWidth } ) } >
                { children }
            </button>
        </div>
    );
};

export default Button;