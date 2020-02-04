import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, signup, unique, passwordCheck } from "../../modules/auth";
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
        const usernameLength = name === 'username' && value.length > 4;
        if (name === 'passwordConfirm') {
            const result = form.password === form.passwordConfirm;
            dispatch (
                passwordCheck(!result)
            )
        } else if (value !== '' || (error[name] === true && value === '')) {
            if (name !== 'username' || usernameLength) {
                dispatch(
                    unique({
                        type: name,
                        value: form[name]
                    })
                )
            }
        }
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