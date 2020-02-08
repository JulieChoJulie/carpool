import React, { useEffect, useCallback } from 'react';
import Write from '../../components/write/Write';
import { useSelector, useDispatch } from "react-redux";
import {changeField, changeRoundtrip, initialize, changeOffering } from "../../modules/write";

const WriteContainer = () => {
    const dispatch = useDispatch();
    const { rides, isRoundTrip, offering } = useSelector(({ write }) => ({
        rides: write.rides,
        isRoundTrip: write.isRoundTrip,
        offering: write.offering,
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

    const onChangeRoundtrip = useCallback((boolean) => {
        dispatch(changeRoundtrip(boolean))
    }, [dispatch]);

    // initialize the form when it's unmount
    useEffect(() => {
        return () => {
            dispatch(initialize());
        }
    }, [dispatch]);
    return <Write
        onChange={onChange}
        isRoundTrip={isRoundTrip}
        rides={rides}
        offering={offering}
        onChangeRoundtrip={onChangeRoundtrip}
    />
};

export default WriteContainer;