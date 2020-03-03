import React from 'react';
import classNames from 'classnames';
import './ActiveMenu.scss';

const ActiveMenu = ({ onToggle, isActive }) => {
    return (
        <div className="activeMenu">
            <div
                className={classNames("menu", "active", { isActive: isActive })}
                onClick={() => onToggle(true)}>
                Active
            </div>
            <div
                className={classNames("menu", "inactive", { isActive: !isActive })}
                onClick={() => onToggle(false)}>
                History
            </div>
        </div>
    );
};

export default ActiveMenu;