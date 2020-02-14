import React from 'react';
import ManagePost from "./ManagePost";
import LoginError from "../common/LoginError";

const Manage = ({
                    loading,
                    myPosts,
                    user,
                    onAccept,
                    onCancel,
                    onRemove,
                    onRemoveRide
}) => {
    if (loading || !myPosts) {
        return null;
    }
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
                        onRemoveRide={onRemoveRide}
                    />)
            }
        </>
    );
};

export default Manage;