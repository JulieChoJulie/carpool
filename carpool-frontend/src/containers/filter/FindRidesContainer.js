import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { readPosts } from '../../modules/posts';
import SearchBlock from "../../components/filter/SearchBlock";
import PostList from '../../components/filter/PostList';
import FindRidesTemplate from "../../components/filter/FindRidesTemplate";

const FindRidesContainer = () => {
    const dispatch = useDispatch();
    const { posts } = useSelector(({ posts }) => ({
        posts: posts.posts
    }));

    useEffect(() => {
        dispatch(readPosts());
    })
    return (
        <FindRidesTemplate>
            <SearchBlock/>
            <PostList posts={posts}/>
        </FindRidesTemplate>
    );
};

export default FindRidesContainer;