import React from 'react';
import './PostListTemplate.scss';

const PostListTemplate = ({ children }) => {
    return (
        <div className="postListTemplate">
            <h2>Feed</h2>
            <div className="feed">{children}</div>
        </div>
    );
};

export default PostListTemplate;