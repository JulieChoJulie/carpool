import React from 'react';
import './Button.scss';
import classNames from 'classnames';

const Button = ({ color, fullWidth, children, onClick }) => {
    return (
        <div>
            <button
                className={
                    classNames('Button', color , { fullWidth })
                }
                onClick={onClick}
            >
                { children }
            </button>
        </div>
    );
};

export default Button;