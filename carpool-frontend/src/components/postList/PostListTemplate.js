import React from 'react';
import './PostListTemplate.scss';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const PostListTemplate = ({ user, isSavePage, error, loading, children }) => {
    const verification = (
        <>
            <p>Please verify your student email and get a verified badge.</p>
            <Link to='verification' className='signup'>
                Verify my email now!
            </Link>
        </>

    );
    const isHomepage = (
        <>
        {user !== null ?
            <>
                <h1>Welcome! {user.username}</h1>
                <p> Do you need to find a ride or carpool partners? Post Now! </p>
                <Link to='/post'><Button fullWidth color="burgundy">Post</Button></Link>
                {
                    !user.isStudent
                    && user.isStudentEmail
                    && verification
                }
            </> :
            <>
                <h1>Welcome to Carpool!</h1>
                <p>Sign in and explore all features.</p>
                <Link to='/login'><Button fullWidth color="burgundy">Log in</Button></Link>
                <Link to='/signup' className='signup'>New to Carpool? Sign up now!</Link>
            </>
        }
        <h2>Feed</h2>
        </>
    )
    return (
        <div className="postListTemplate template">
            {!isSavePage && isHomepage}
            <div className="feed">{children}</div>
        </div>
    );
};

export default PostListTemplate;