import React from 'react';
import AuthFormTemplate from '../components/auth/AuthFormTemplate';
import AuthForm from '../components/auth/AuthForm';

const LoginPage = () => {
    return (
        <AuthFormTemplate>
            <AuthForm type="login"/>
        </AuthFormTemplate>
    );
};

export default LoginPage;