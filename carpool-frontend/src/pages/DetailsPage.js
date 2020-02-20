import React from 'react';
import PostContainer from '../containers/post/PostContainer';
import PostTemplate from '../components/post/PostTemplate';
import CommentContainer from '../containers/post/CommentContainer';
import CommentTemplate from "../components/post/CommentTemplate";
import HeaderContainer from "../containers/common/HeaderContainer";
import SideMenuContainer from "../containers/common/SideMenuContainer";

const DetailsPage = () => {
    return (
        <>
            <HeaderContainer/>
            <div className="container">
                <SideMenuContainer/>
                <PostTemplate>
                    <PostContainer/>
                    <CommentTemplate>
                        <CommentContainer/>
                    </CommentTemplate>
                </PostTemplate>
            </div>
        </>
    );
};

export default DetailsPage;