import React, { useEffect, useCallback } from 'react';
import Write from '../../components/write/Write';
import { useSelector, useDispatch } from "react-redux";
import {changeField, changeRoundtrip, initialize, changeOffering, writePost } from "../../modules/write";
import { withRouter } from 'react-router-dom';


const WriteContainer = ({ history }) => {
    const dispatch = useDispatch();
    const { rides, isRoundTrip, offering, postId, postError } = useSelector(({ write }) => ({
        rides: write.rides,
        isRoundTrip: write.isRoundTrip,
        offering: write.offering,
        postId: write.postId,
        postError: write.postError
    }));

    const onChange = useCallback((e, name, id) => {
        let value;
        if (e instanceof Date) {
            value = e;
        } else {
            (e.value !== 'undefined' ? value = e.value : value = e.target.value)
        }

        if (name === 'offering') {
            dispatch(changeOffering(value))
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

    const onSubmit = () => {
        if (!isRoundTrip) {
            const ride = rides[0];
            dispatch(writePost({ ride }));
        } else {
            dispatch(writePost({ rides }));
        }
    }

    const onChangeRoundtrip = useCallback((boolean) => {
        dispatch(changeRoundtrip(boolean))
    }, [dispatch]);

    // initialize the form when it's unmount
    useEffect(() =>{
        dispatch(initialize());
    }, [dispatch]);

    useEffect(() => {
        if (postId) {
            history.push(`/post/${postId}`);
        }
        if (postError) {
            console.log(postError);
        }
    }, [history, postId, postError]);

    return <Write
        onChange={onChange}
        isRoundTrip={isRoundTrip}
        rides={rides}
        offering={offering}
        onChangeRoundtrip={onChangeRoundtrip}
        onSubmit={onSubmit}
    />
};

export default withRouter(WriteContainer);
