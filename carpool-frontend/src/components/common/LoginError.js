import React from 'react';
import Button from './Button';
import './LoginError.scss';

const LoginError = ({ message }) => {
    return (
        <div className="loginError">
            {`Please log in to ${message}.`}
            <Button color='burgundy' fullWidth to='/login'>Log In</Button>
        </div>
    );
};

export default LoginError;