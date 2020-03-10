import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, signup, unique, passwordCheck, emailCheck } from "../../modules/auth";
import AuthForm from '../../components/auth/AuthForm';
import * as EmailValidator from 'email-validator';
import { profile } from '../../modules/user'
import { withRouter } from 'react-router-dom';

const SignupForm = ({ history }) => {
    const [typingTimeout, setTypingTimeout] = useState(0);
    const dispatch = useDispatch();
    const {
        form,
        auth,
        authError,
        error,
        user,
        isStudentEmail,
    } = useSelector(({ auth, user }) => ({
        form: auth.signup,
        auth: auth.auth,
        authError: auth.authError,
        error: auth.error,
        user: user.user,
        isStudentEmail: auth.signup.isStudentEmail,
    }));

    const uniqueDispatch = (name, value, form, password) => {
        const usernameLength = name === 'username' && value.length > 4;
        if (name === 'email' && value !== '') {
            dispatch(
                emailCheck(!EmailValidator.validate(value))
            );
        }
        if (name === 'passwordConfirm') {
            const passwordValue = password ? password : form.password;
            const result = value === passwordValue;
            dispatch (
                passwordCheck(!result)
            )
        } else if (value !== '' || (error[name] === true && value === '')) {
            if (name !== 'username' || usernameLength) {
                if(name !== 'email' || !error.emailValidation) {
                    dispatch(
                        unique({
                            type: name,
                            value: value
                        })
                    )
                }
            }
        }
    };

    // no need to use useCallback due to deps [form]
    // render it everytime form is changed
    const onChange = e => {
        const {name, value} = e.target;
        clearTimeout(typingTimeout);
        dispatch(
            changeField({
                form: 'signup',
                key: name,
                value,
            })
        );
        if (name === 'password' && form.passwordConfirm !== '') {
            setTypingTimeout(setTimeout(function () {
                uniqueDispatch(
                    'passwordConfirm',
                    form.passwordConfirm,
                    form,
                    value
                );
            }, 600));
        }
        if ((name === 'email' && EmailValidator.validate(value))
            || name === 'passwordConfirm' || name === 'username') {
            setTypingTimeout(setTimeout(function () {
                uniqueDispatch(name, value, form);
            }, 600));
        }
    };

    // no need to use useCallback due to deps [form]
    // render it everytime form is changed
    const onBlur = e => {
            clearTimeout(typingTimeout);
            const { name, value } = e.target;
            uniqueDispatch(name, value, form);

    };

    // no need to use useCallback due to deps [form]
    // render it everytime form is changed
    const onSubmit = e => {
        e.preventDefault();
        const { username, password, cell, email } = form;
        if (!error.username
            && !error.email
            && !error.passwordConfirm
            && username.length > 4
            && !error.emailVerification
        ) {
            dispatch(signup({username, cell, email, password, isStudentEmail }));
        }
    };

    useEffect(() => {
        if (auth) {
            console.log(auth);
            dispatch(profile());
        }
        if (authError) {
            console.log(authError)
        }
    }, [auth, authError, dispatch]);

    // if the user was not in /signup/isStudentEmail page before,
    // push to that page
    useEffect(() => {
        if (isStudentEmail === null) {
            history.push('/signup/isStudentEmail');
        }
    }, [isStudentEmail])

    useEffect(() => {
        if (user) {
            if(!user.isStudent && user.isStudentEmail) {
                history.push('/verification');
            } else {
                history.push('/');
                try {
                    localStorage.setItem('user', JSON.stringify(user));
                } catch (e) {
                    console.log('localStorage is not working.');
                }
            }
        }
    }, [history, user])

    return (
        <AuthForm
            type="signup"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            onBlur={onBlur}
            error={error}
        />
    )
};

export default withRouter(SignupForm);