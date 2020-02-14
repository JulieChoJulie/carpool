import React from 'react';
import './ManageTemplate.scss';

const ManageTemplate = ({ children }) => {
    return (
        <div className="manageTemplate template">
            <h2>Manage Your Rides</h2>
            { children }
        </div>
    );
};

export default ManageTemplate;