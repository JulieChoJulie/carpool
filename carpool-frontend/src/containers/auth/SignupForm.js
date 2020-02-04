import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, signup } from "../../modules/auth";
import AuthForm from '../../components/auth/AuthForm';

const SignupForm = () => {
    const dispatch = useDispatch();
    const { form, auth, authError } = useSelector(({ auth }) => ({
        form: auth.signup,
        auth: auth.auth,
        authError: auth.authError
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

    const onSubmit = e => {
        e.preventDefault();
        const { username, password, cell, email } = form;
        dispatch(signup({ username, cell, email, password }));
    };

    const onClick = e => {
        e.preventDefault();
        // To be continued...
    }

    // initialize the form when the comp is first rendered;
    useEffect(() => {
        dispatch(initializeForm('signup'));
    }, [dispatch]);

    useEffect(() => {
        if (auth) {
            console.log(auth);
        }
        if (authError) {
            console.log(authError);
        }
    }, [auth, authError]);

    return (
        <AuthForm
            type="signup"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            onClick={onClick}
        />
    );
};

export default SignupForm;