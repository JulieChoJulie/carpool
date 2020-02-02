import React from 'react';
import AuthFormTemplate from '../components/auth/AuthFormTemplate';
import AuthForm from '../components/auth/AuthForm';

const RegisterPage = () => {
    return (
        <AuthFormTemplate>
            <AuthForm type="signup"/>
        </AuthFormTemplate>
    );
};

export default RegisterPage;