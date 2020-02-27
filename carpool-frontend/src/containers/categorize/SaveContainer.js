import React from 'react';
import SaveTemplate from "../../components/categorize/SaveTemplate";
import PostListContainer from "../postList/PostListContainer";

const SaveContainer = () => {
    return (
        <SaveTemplate>
            <PostListContainer/>
        </SaveTemplate>
    );
};

export default SaveContainer;