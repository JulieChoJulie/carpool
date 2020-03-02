import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from "../../modules/auth";
import AuthForm from '../../components/auth/AuthForm';
import { withRouter } from 'react-router-dom';
import { profile } from '../../modules/user';
import { socketLogin} from "../../modules/socket";

const LoginForm = ({ history }) => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
    }));

    const onChange = e => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value,
            })
        );
    };

    const onSubmit = e => {
        e.preventDefault();
        const { username, password } = form;
        if (username === '' || password === '') {
            setError('The username and password should be filled.')
        } else {
            dispatch(login({ username, password }));
        }
    };

    // initialize the form when the comp is first rendered;
    useEffect(() => {
        dispatch(initializeForm('login'));
    }, [dispatch]);

    useEffect(() => {
        if (user !== null) {
            dispatch(socketLogin(user.id));
        }
    }, [dispatch, user])

    useEffect(() => {
        if (authError) {
           if (authError.status === 401) {
               setError('The password you entered is not correct.')
           } else if (authError.status === 404) {
               setError('The username you entered is not registered.')
           } else {
               setError('Internal Server Error!')
           }
        }
        if (auth) {
            console.log(auth);
            dispatch(profile());
        }
    }, [auth, authError, dispatch]);

    useEffect(() => {
        if (user) {
            history.push('/');
            try {
                localStorage.setItem('user', JSON.stringify(user));
            } catch (e) {
                console.log('localStorage is not working.');
            }
        }
    }, [history, user]);

    return (
        <AuthForm
            type="login"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default withRouter(LoginForm);
