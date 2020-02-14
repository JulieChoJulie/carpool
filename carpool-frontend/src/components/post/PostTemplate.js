import React from 'react';
import './PostTemplate.scss';

const PostTemplate = ({ children }) => {
    return (
        <div className="postTemplate template">
            {children}
         </div>
    );
};

export default PostTemplate;