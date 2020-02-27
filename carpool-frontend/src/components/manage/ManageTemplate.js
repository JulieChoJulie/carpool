import React from 'react';

const ManageTemplate = ({ children }) => {
    return (
        <div className="manageTemplate template">
            <h2>Manage Your Posts</h2>
            { children }
        </div>
    );
};

export default ManageTemplate;