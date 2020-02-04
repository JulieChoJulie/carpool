import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, signup, unique } from "../../modules/auth";
import AuthForm from '../../components/auth/AuthForm';

const SignupForm = () => {
    const dispatch = useDispatch();
    const { form, auth, authError, error } = useSelector(({ auth }) => ({
        form: auth.signup,
        auth: auth.auth,
        authError: auth.authError,
        error: auth.error
    }));

    const onChange = e => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'signup',
                key: name,
                value,
            })
        );
    };

    const onBlur = e => {
        const { name, value } = e.target;
        if (value !== '' || error[name] === true && value === '') {
            dispatch(
                unique({
                    type: name,
                    value: form[name]
                })
            )
        }
    }

    const onSubmit = e => {
        e.preventDefault();
        const { username, password, cell, email } = form;
        dispatch(signup({ username, cell, email, password }));
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