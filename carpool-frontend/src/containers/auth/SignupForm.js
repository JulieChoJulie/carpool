import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm } from "../../modules/auth";
import AuthForm from '../../components/auth/AuthForm';

const SignupForm = () => {
    console.log('here')

    const dispatch = useDispatch();
    const { form } = useSelector(({ auth }) => ({
        form: auth.signup
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
        // TBA
    };

    // initialize the form when the comp is first rendered;
    useEffect(() => {
        dispatch(initializeForm('signup'));
    }, [dispatch]);

    return (
        <AuthForm
            type="signup"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    );
};

export default SignupForm;