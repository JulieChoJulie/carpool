import React from 'react';

const SaveTemplate = ({ children }) => {
    return (
        <div className="saveTemplate template">
            <h2>Saved Posts</h2>
            { children }
        </div>
    );
};

export default SaveTemplate;