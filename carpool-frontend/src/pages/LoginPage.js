import React from 'react';
import AuthFormTemplate from '../components/auth/AuthFormTemplate';
import LoginForm from '../containers/auth/LoginForm';

const LoginPage = () => {
    return (
        <AuthFormTemplate>
            <LoginForm />
        </AuthFormTemplate>
    );
};

export default LoginPage;