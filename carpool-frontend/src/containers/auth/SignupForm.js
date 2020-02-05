import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, signup, unique, passwordCheck, emailCheck } from "../../modules/auth";
import AuthForm from '../../components/auth/AuthForm';
import * as EmailValidator from 'email-validator';

const SignupForm = () => {
    const [typingTimeout, setTypingTimeout] = useState(0);
    const dispatch = useDispatch();
    const { form, auth, authError, error } = useSelector(({ auth }) => ({
        form: auth.signup,
        auth: auth.auth,
        authError: auth.authError,
        error: auth.error
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

    const onChange = e => {
        const { value, name } = e.target;
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
                uniqueDispatch('passwordConfirm', form.passwordConfirm, form, value);
            }, 600));
        }
        if (name === 'email' || name === 'passwordConfirm' || name === 'username') {
            setTypingTimeout(setTimeout(function () {
                uniqueDispatch(name, value, form);
            }, 600));
        }
    };

    const onBlur = e => {
        clearTimeout(typingTimeout);
        const { name, value } = e.target;
        uniqueDispatch(name, value, form);
    };


    const onSubmit = e => {
        e.preventDefault();
        const { username, password, cell, email } = form;
        if (!error.username && !error.email && !error.passwordConfirm && username.length > 4) {
            dispatch(signup({username, cell, email, password}));
        }
    };

    // initialize the form when the comp is first rendered;
    useEffect(() => {
        dispatch(initializeForm('signup'));
    }, [dispatch]);

    useEffect(() => {
        if (auth) {
            console.log(auth);
        }
        if (authError) {
            console.log(authError)
        }
    }, [auth, authError]);

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

export default SignupForm;