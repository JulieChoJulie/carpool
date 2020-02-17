import React from 'react';
import './PostListTemplate.scss';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const PostListTemplate = ({ username, children }) => {
    return (
        <div className="postListTemplate">
            <h1>Welcome! {username}</h1>
            <p>Do you need to find a ride or carpool partners? Post Now! </p>
            <Link to='/post'><Button fullWidth color="burgundy">Post</Button></Link>
            <h2>Feed</h2>
            <div className="feed">{children}</div>
        </div>
    );
};

export default PostListTemplate;