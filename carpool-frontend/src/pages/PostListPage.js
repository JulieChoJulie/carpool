import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import SideMenuContainer from "../containers/common/SideMenuContainer";
import PostListContainer from "../containers/postList/PostListContainer";

const PostListPage = () => {
    return (
        <div>
            <HeaderContainer />
            <div className="container">
                <SideMenuContainer/>
                <PostListContainer/>
            </div>
        </div>
    );
};

export default PostListPage;