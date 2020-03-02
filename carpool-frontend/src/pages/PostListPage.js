import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import SideMenuContainer from "../containers/common/SideMenuContainer";
import PostListContainer from "../containers/postList/PostListContainer";

const PostListPage = () => {
    return (
        <>
            <HeaderContainer />
            <div className="container">
                <SideMenuContainer/>
                <PostListContainer/>
            </div>
        </>
    );
};

export default PostListPage;