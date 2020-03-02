import React, {useCallback, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterRides, onChange, initialize } from '../../modules/posts';
import SearchBlock from "../../components/filter/SearchBlock";
import PostList from '../../components/filter/PostList';
import FindRidesTemplate from "../../components/filter/FindRidesTemplate";

const FindRidesContainer = () => {
    const dispatch = useDispatch();
    const { rides, criteria } = useSelector(({ posts }) => ({
        rides: posts.filterRides,
        criteria: posts.criteria,
    }));

    const onChangeValue = useCallback((e, name, id) => {
        let value;
        if (e instanceof Date) {
            value = e;
        } else {
            (e.value !== 'undefined' ? value = e.value : value = e.target.value)
        }

        if (name === 'offering') {
            dispatch(onChange ({
                key: name,
                value: value,
             }))
        } else {
            dispatch(onChange({
                key: name,
                value,
                id
            }))
        }
    }, [dispatch]);

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(filterRides(criteria));
    };

    useEffect(() => {
        dispatch(initialize());
        dispatch(filterRides(criteria));
    }, [dispatch, criteria]);

    return (
        <FindRidesTemplate>
            <SearchBlock criteria={criteria} onChange={onChangeValue} onSubmit={onSubmit}/>
            <PostList rides={rides}/>
        </FindRidesTemplate>
    );
};

export default FindRidesContainer;