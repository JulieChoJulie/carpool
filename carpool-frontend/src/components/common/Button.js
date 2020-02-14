import React from 'react';
import './Button.scss';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

const Button = ({ to, history, color, fullWidth, small, children, ...rest }) => {
    const onClick = e => {
        if (to) {
            history.push(to);
        }
        if (rest.onClick) {
            rest.onClick(e)
        }
    }
    return (
        <div>
            <button
                className={
                    classNames('Button', color , { small }, { fullWidth })
                }
                onClick={onClick}
            >
                { children }
            </button>
        </div>
    );
};

export default withRouter(Button);