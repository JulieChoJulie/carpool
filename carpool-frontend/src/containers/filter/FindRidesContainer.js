import React from 'react';
import SearchBlock from "../../components/filter/SearchBlock";
import PostList from '../../components/filter/PostList';
import FindRidesTemplate from "../../components/filter/FindRidesTemplate";

const FindRidesContainer = () => {
    return (
        <FindRidesTemplate>
            <SearchBlock/>
            <PostList />
        </FindRidesTemplate>
    );
};

export default FindRidesContainer;