import React from 'react';
import Header from '../components/common/Header';
import PostContainer from '../containers/post/PostContainer';
import PostTemplate from '../components/post/PostTemplate';
import CommentContainer from '../containers/post/CommentContainer';
import CommentTemplate from "../components/post/CommentTemplate";

const fakeDataPost = {
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
            "offering": false,
            "price": "10.00",
            "postId": 1
        },
        {
            "id": 2,
            "seats": 4,
            "available": 3,
            "to": "Arnprior",
            "from": "Aylmer",
            "when": "2020-02-11T04:23:51.000Z",
            "status": true,
            "offering": false,
            "price": "15.00",
            "postId": 1
        }
    ],
    "user": {
        "id": 1,
        "username": "Julie"
    },
    "comments": [
        {
            "content": "Hello, I am interested in your ride. Please check dm.",
            "createdAt": "2020-02-09T20:25:54.000Z",
            "updatedAt": "2020-02-09T20:25:54.000Z",
            "userId": 3,
            "user": {
                "id": 3,
                "username": "Julie2"
            }
        },
        {
            "content": "Check your dm.",
            "createdAt": "2020-02-08T20:25:54.000Z",
            "updatedAt": "2020-02-08T20:25:54.000Z",
            "userId": 3,
            "user": {
                "id": 3,
                "username": "Julie2"
            }
        }
    ]
};

const DetailsPage = () => {
    return (
        <>
            <Header/>
            <PostTemplate>
                <PostContainer post={fakeDataPost}/>
                <CommentTemplate>
                    <CommentContainer comments={fakeDataPost.comments}/>
                </CommentTemplate>
            </PostTemplate>
        </>
    );
};

export default DetailsPage;