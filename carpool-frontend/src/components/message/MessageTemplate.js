import React from 'react';
import './messageTemplate.scss';

const MessageTemplate = ({ children }) => {
    return (
        <div className="template messageTemplate">
            <h2>Messages</h2>
            { children }
        </div>
    );
};

export default MessageTemplate;