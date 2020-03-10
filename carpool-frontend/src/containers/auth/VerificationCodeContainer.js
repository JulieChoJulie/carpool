import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { sendCode, changeField, compareCodes } from "../../modules/user";
import VerificationCode from "../../components/auth/VerificationCode";
import { withRouter } from 'react-router-dom';
import {interfaceDeclaration} from "@babel/types";

const VerificationCodeContainer = ({ history }) => {
    const dispatch = useDispatch();
    const { verificationError, user, code, time } = useSelector(({ user }) => ({
        verificationError: user.verificationError,
        user: user.user,
        code: user.verification.code,
        time: user.verification.time,
    }));
    const [error, setError] = useState(null);
    const [min, setMin] = useState(null);
    const [sec, setSec] = useState(0);

    const onClickSend = useCallback((e) => {
        e.preventDefault();
        dispatch(sendCode());
    }, [dispatch]);

    const onChange = useCallback((e)=> {
        dispatch(changeField({
            form: 'verification',
            key: 'code',
            value: e.target.value,
        }))
    });

    const onClickCompare = useCallback((e) => {
        e.preventDefault();
        dispatch(compareCodes(parseInt(code)));
    }, [dispatch, code]);

    useEffect(() => {
        if (!user) {
            history.push('/login');
        } else if (!user.isStudentEmail) {
            setError('Your email is not a student email address.');
        } else if (user.isStudent) {
            setError('You already verified your student email.');
        } else if (verificationError) {
            if (verificationError === 404) {
                setError('The code you entered is not correct. Please try again.');
            }
        }
        else {
            setError(null);
        }
    }, [user, history, verificationError]);


    useEffect(() => {
        if (time) {
            let delta = Math.abs(new Date(time) - new Date()) / 1000;
            const days = Math.floor(delta / 86400);
            delta -= days * 86400;
            const hours = Math.floor(delta / 3600) % 24;
            delta -= hours * 3600;
            const minutes = Math.floor(delta / 60) % 60;
            delta -= minutes * 60;
            const seconds = Math.floor(delta % 60);
            setMin(minutes);
            setSec(seconds);
        }
    }, [time]);

    useEffect(() => {
        if (min !== null) {
            const timer = setInterval(() => {
                if (sec > 0) {
                    setSec(sec - 1);
                }
                if (sec === 0) {
                    if (min === 0) {
                        clearInterval(timer)
                    } else {
                        setMin(min - 1);
                        setSec(59);
                    }
                }
            }, 1000);
            return (() => {
                clearInterval(timer);
            })
        }
    }, [sec, min]);

    // useEffect(() => {
    //     if (user.isStudent) {
    //         history.push('/verificationSuccess');
    //     }
    // }, [user])

    return (
        <VerificationCode
            user={user}
            verificationError={verificationError}
            code={code}
            min={min}
            time={time}
            sec={sec}
            onClickSend={onClickSend}
            onChange={onChange}
            onClickCompare={onClickCompare}
            error={error}
        />
    );
};

export default withRouter(VerificationCodeContainer);