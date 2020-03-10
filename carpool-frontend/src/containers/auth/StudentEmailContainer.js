import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { verifyStudentEmail, changeField, initializeForm } from '../../modules/auth';
import StudentEmail from '../../components/auth/StudentEmail';
import { withRouter } from 'react-router-dom';
import {profile} from "../../modules/user";

const StudentEmailContainer = ({ history }) => {
    const dispatch = useDispatch();
    const {
        isStudentEmail,
        studentEmail,
        isStudentEmailError,
        emailAddress,
        auth,
        authError,
    } = useSelector(({ auth }) => ({
        isStudentEmail: auth.signup.isStudentEmail,
        studentEmail: auth.signup.studentEmail,
        auth: auth.auth,
        authError: auth.authError,
        isStudentEmailError: auth.isStudentEmailError,
        emailAddress: auth.signup.studentEmailAddress,
    }));
    const [ownEmail, setOwnEmail] = useState(true);
    const [error, setError] = useState(null);

    const onClick = useCallback((email) => {
        dispatch(verifyStudentEmail(email));
    }, [dispatch]);

    const onClickRadio = useCallback((boolean) => {
        setOwnEmail(boolean);
    }, [setOwnEmail]);

    const onSwitchAddress = useCallback((e) => {
        dispatch(changeField({
            form: 'signup',
            key: 'studentEmailAddress',
            value: e.target.value
        }));
    }, [dispatch]);

    const onChange = useCallback((e) => {
        const email = e.target.value;
        dispatch(changeField({ form:'signup', key:'studentEmail', value: email }));
        if (email.length > 2) {
            setError(null);
            dispatch(verifyStudentEmail(email));
        }
    }, [dispatch]);

    const onClickNext = useCallback((e) => {
        e.preventDefault();
        if (!ownEmail) {
            dispatch(changeField({ form:'signup', key:'isStudentEmail', value: false }));
            history.push('/signup');
        } else if (ownEmail) {
            if (studentEmail.length <= 2 ) {
                setError('The email should be longer than 3 characters.');
            } else if (isStudentEmailError) {
                if (isStudentEmail === 409) {
                    setError('The entered email is already taken.');
                } else {
                    setError('Internal Server Error. Please try later..');
                }
            } else {
                history.push('/signup');
            }
        }
    }, [ownEmail, dispatch, studentEmail, history, isStudentEmail, isStudentEmailError]);


    // initialize the form when the comp is first rendered;
    useEffect(() => {
        dispatch(initializeForm('signup'));
    }, [dispatch, history]);

    useEffect(() => {
        if (auth) {
            console.log(auth);
            dispatch(profile());
        }
        if (authError) {
            console.log(authError)
        }
    }, [auth, authError, dispatch]);

    return (
        <StudentEmail
            isStudentEmail={isStudentEmail}
            onClick={onClick}
            studentEmail={studentEmail}
            isStudentEmailError={isStudentEmailError}
            onChange={onChange}
            onClickRadio={onClickRadio}
            onSwitchAddress={onSwitchAddress}
            ownEmail={ownEmail}
            emailAddress={emailAddress}
            onClickNext={onClickNext}
            error={error}
        />
    );
};

export default withRouter(StudentEmailContainer);