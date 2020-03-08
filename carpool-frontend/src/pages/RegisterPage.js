import React from 'react';
import AuthFormTemplate from '../components/auth/AuthFormTemplate';
import SignupForm from "../containers/auth/SignupForm";
import StudentEmailContainer from "../containers/auth/StudentEmailContainer";

const RegisterPage = ({ location }) => {
    const isStudentEmail = location.pathname.includes('isStudentEmail');
    if (isStudentEmail) {
        return (
            <AuthFormTemplate>
                <StudentEmailContainer/>
            </AuthFormTemplate>
        )
    } else {
        return (
            <AuthFormTemplate>
                <SignupForm/>
            </AuthFormTemplate>
        );
    }
};

export default RegisterPage;