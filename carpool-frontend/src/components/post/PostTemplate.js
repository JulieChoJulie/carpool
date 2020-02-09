import React from 'react';
import './PostTemplate.scss';

const PostTemplate = ({ children }) => {
    return (
        <div className="postTemplate">
            {children}
         </div>
    );
};

export default PostTemplate;