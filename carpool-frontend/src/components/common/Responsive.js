import React from 'react';
import './Responsive.scss';
import classNames from 'classnames';

const Responsive = ({ children, ...rest }) => {
    return (
        <div className={
            classNames('responsive', rest.addclass)
        } {...rest}>
            {children }
        </div>
    );
};

export default Responsive;