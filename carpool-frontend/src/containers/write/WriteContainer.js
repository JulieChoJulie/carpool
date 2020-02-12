import React, { useEffect, useCallback, useState } from 'react';
import Write from '../../components/write/Write';
import { useSelector, useDispatch } from "react-redux";
import {
    changeField, changeRoundtrip, initialize, writePost, getOwner
} from "../../modules/write";
import { withRouter } from 'react-router-dom';

const WriteContainer = ({ history, match }) => {
    const isEdit = match.params && (match.params.id);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const {
        rides, isRoundTrip, postId, postError, user, notes, isOwner
    } = useSelector(({ write, user }) => ({
        rides: write.rides,
        isRoundTrip: write.isRoundTrip,
        postId: write.postId,
        postError: write.postError,
        user: user.user,
        notes: write.notes,
        isOwner: write.isOwner,
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

    const checkValidation = (requiredRides) => {
        // return an array of two number
        // arr[0] indicates whether all city fields are filled.
        // arr[1] indicates whether ride.to and ride.from are the same city
        return requiredRides.reduce((acc, ride) => {
            if (ride.to.length === 0 || ride.from.length === 0) {
                acc[0] = 1;
            } else if (ride.to === ride.from) {
                acc[1] = 1;
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
            if (isError[0]) {
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

    // when it's on editing mode, fill out the form.
    useEffect(() =>{
        if (isEdit) {
            dispatch(getOwner(isEdit));
            // if the user is not the writer
            if (isOwner !== null && isOwner !== 200) {
                history.push(`/error/${isOwner}`);
            }
        }
    }, [dispatch, isEdit, isOwner, history]);


    // after submiting
    useEffect(() => {
        if (postId) {
            history.push(`/posts/${postId}`);
        }
        if (postError) {
            console.log(postError);
        }
    }, [history, postId, postError]);

    // initialize the form when it's unmounted.
    useEffect(() => {
        return (() => dispatch(initialize()));
    }, [dispatch])

    if (!isEdit || isOwner === 200) {
        return <Write
            onChange={onChange}
            isRoundTrip={isRoundTrip}
            rides={rides}
            onChangeRoundtrip={onChangeRoundtrip}
            onSubmit={onSubmit}
            error={error}
            notes={notes}
        />
    } else {
        return null;
    }
};

export default withRouter(WriteContainer);
