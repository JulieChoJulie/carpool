import React from 'react';

const FindRidesTemplate = ({ children }) => {
    return (
        <div className="findRidesTemplate template">
            <h2>Filter Posts</h2>
            { children }
        </div>
    );
};

export default FindRidesTemplate;