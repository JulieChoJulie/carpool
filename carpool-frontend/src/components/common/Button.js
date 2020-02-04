import React from 'react';
import './Button.scss';
import classNames from 'classnames';

const Button = ({ color, fullWidth, children, check, button }) => {
    const type = button ? 'button' : 'submit';
    return (
        <div>
            <button
                className={
                    classNames('Button', color , { fullWidth }, { check }) }
                type={type}
            >
                { children }
            </button>
        </div>
    );
};

export default Button;