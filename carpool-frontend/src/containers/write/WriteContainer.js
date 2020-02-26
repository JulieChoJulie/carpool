import React, { useEffect, useCallback, useState } from 'react';
import Write from '../../components/write/Write';
import { useSelector, useDispatch } from "react-redux";
import {
    changeField, changeRoundtrip, initialize, writePost
} from "../../modules/write";
import { withRouter } from 'react-router-dom';

const WriteContainer = ({ history }) => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const {
        rides, isRoundTrip, postId, postError, user, notes
    } = useSelector(({ write, user }) => ({
        rides: write.rides,
        isRoundTrip: write.isRoundTrip,
        postId: write.postId,
        postError: write.postError,
        user: user.user,
        notes: write.notes,
    }));

    const onChange = useCallback((e, name, id) => {
        let value;
        if (e instanceof Date || name === 'notes') {
            value = e;
        } else {
            (e.value !== 'undefined' ? value = e.value : value = e.target.value)
        }

        if (name === 'offering' || name === 'notes') {
            dispatch(changeField ({
                key: name,
                value: value,
                id: (name === 'offering' ? -1 : -2)
            }))
        } else {
            dispatch(changeField({
                key: name,
                value,
                id
            }))
        }
    }, [
        dispatch
    ]);


    // check if all city fields are filled out
    const checkValidation = (requiredRides) => {
        // return an array of two number
        // arr[0] indicates whether all city fields are filled.
        // arr[1] indicates whether ride.to and ride.from are the same city
        return requiredRides.reduce((acc, ride) => {
            if (ride.to === '' || ride.from === '') {
                acc[0] = 1;
            } else if (ride.to === ride.from) {
                if (ride.to === 'Anywhere') {
                    acc[1] = 0;
                } else {
                    acc[1] = 1;
                }
            }
            return acc;
        }, [0, 0]);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const requiredRides = (!isRoundTrip ? rides.slice(0, 1) : rides);
        const result = checkValidation(requiredRides); // an array of two num
        // no error = [0, 0] => sum of two num in arr should be 0
        const isError = result[0] + result[1] > 0;

        if (!user) {
            setError('**Log in is required to write a post.**')
        } else if (isError) {
            if (result[0]) {
                setError('**Please fill out all fields.**');
            } else {
                setError('**The departure and arrival cannot be the same city.**')
            }
        } else {
            dispatch(writePost({ rides: requiredRides, notes }))
        }
    };

    const onChangeRoundtrip = useCallback((boolean) => {
        dispatch(changeRoundtrip(boolean))
    }, [dispatch]);

    // after submiting
    useEffect(() => {
        if (postId) {
            history.push(`/posts/${postId}`);
        }
        if (postError) {
            console.log(postError);
        }
    }, [history, postId, postError]);

    // intiailize the from when it's unmounted
    useEffect(() => {
        return(() => dispatch(initialize()));
    }, [dispatch])


    return <Write
        onChange={onChange}
        isRoundTrip={isRoundTrip}
        rides={rides}
        onChangeRoundtrip={onChangeRoundtrip}
        onSubmit={onSubmit}
        error={error}
        notes={notes}
    />

};

export default withRouter(WriteContainer);
