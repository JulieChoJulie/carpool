import React, {useCallback, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterRides, onChange } from '../../modules/posts';
import SearchBlock from "../../components/filter/SearchBlock";
import PostList from '../../components/filter/PostList';
import FindRidesTemplate from "../../components/filter/FindRidesTemplate";

const FindRidesContainer = () => {
    const dispatch = useDispatch();
    const { rides, ridesError, criteria } = useSelector(({ posts }) => ({
        rides: posts.filterRides,
        ridesError: posts.filterRidesError,
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
    }, [dispatch, criteria]);

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(filterRides(criteria));
    };

    useEffect(() => {

    }, [dispatch]);

    return (
        <FindRidesTemplate>
            <SearchBlock criteria={criteria} onChange={onChangeValue} onSubmit={onSubmit}/>
            <PostList rides={rides}/>
        </FindRidesTemplate>
    );
};

export default FindRidesContainer;