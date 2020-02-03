import React from 'react';
import AuthFormTemplate from '../components/auth/AuthFormTemplate';
import SignupForm from "../containers/auth/SignupForm";

const RegisterPage = () => {
    return (
        <AuthFormTemplate>
            <SignupForm/>
        </AuthFormTemplate>
    );
};

export default RegisterPage;