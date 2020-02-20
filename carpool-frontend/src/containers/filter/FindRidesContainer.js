import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterRides } from '../../modules/posts';
import SearchBlock from "../../components/filter/SearchBlock";
import PostList from '../../components/filter/PostList';
import FindRidesTemplate from "../../components/filter/FindRidesTemplate";

const FindRidesContainer = () => {
    const dispatch = useDispatch();
    const { rides, ridesError } = useSelector(({ posts }) => ({
        rides: posts.filterRides,
        ridesError: posts.filterRidesError
    }));

    useEffect(() => {
        dispatch(filterRides({}));
    }, [dispatch]);

    return (
        <FindRidesTemplate>
            <SearchBlock/>
            <PostList rides={rides}/>
        </FindRidesTemplate>
    );
};

export default FindRidesContainer;