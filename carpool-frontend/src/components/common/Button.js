import React from 'react';
import './Button.scss';

const Button = (props) => {
    return (
        <div>
            <button className={`Button ${props.color}`}>{props.children}</button>
        </div>
    );
};

export default Button;