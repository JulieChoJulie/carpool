import React from 'react';
import ManagePost from "./ManagePost";
import LoginError from "../common/LoginError";
import Button from '../common/Button';

const Manage = ({
                    loading,
                    myPosts,
                    user,
                    onAccept,
                    onCancel,
                    onCancelRequest,
                    onRemove,
                    onRemoveRide
}) => {
    if (loading || !myPosts) {
        return null;
    }
    if (Array.isArray(myPosts) && myPosts.length === 0) {
        return (
            <>
                <div>Please post first! </div>
                <Button medium color="burgundy" to="/post">Post</Button>
            </>
        )
    }

    console.log(!myPosts);
    return (
        <>
            {!user ?
                <LoginError message="to manage your rides."/>
                :
                myPosts.map(post =>
                    <ManagePost
                        key={post.id}
                        post={post}
                        onAccept={onAccept}
                        onCancel={onCancel}
                        onRemove={onRemove}
                        onCancelRequest={onCancelRequest}
                        onRemoveRide={onRemoveRide}
                    />)
            }
        </>
    );
};

export default Manage;