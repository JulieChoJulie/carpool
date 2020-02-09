import React from 'react';
import Header from '../components/common/Header';
import PostContainer from '../containers/post/PostContainer';
import PostTemplate from '../components/post/PostTemplate';
import Post from "../components/post/Post";

const post = {
    "id": 1,
    "status": true,
    "notes": "Hello",
    "createdAt": "2020-02-09T04:23:59.000Z",
    "updatedAt": "2020-02-09T04:23:59.000Z",
    "deletedAt": null,
    "userId": 1,
    "rides": [
        {
            "id": 1,
            "seats": 1,
            "available": 1,
            "from": "Arnprior",
            "to": "Aylmer",
            "when": "2020-02-09T04:23:51.000Z",
            "status": true,
            "offering": true,
            "price": "10.00",
            "postId": 1
        }
    ],
    "user": {
        "id": 1,
        "username": "Julie"
    },
    "comments": []
}

const DetailsPage = () => {
    return (
        <>
            <Header/>
            <PostTemplate>
                <PostContainer post={post}/>
            </PostTemplate>
        </>
    );
};

export default DetailsPage;