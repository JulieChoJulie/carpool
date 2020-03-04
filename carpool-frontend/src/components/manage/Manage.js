import React from 'react';
import ManagePost from "./ManagePost";
import LoginError from "../common/LoginError";
import Button from '../common/Button';
import ActiveMenu from "../../components/common/ActiveMenu";
import ReservationsTemplate from "../categorize/Reservations";

const Manage = ({
    loading,
    myPosts,
    user,
    onAccept,
    onCancel,
    onCancelRequest,
    onRemove,
    onRemoveRide,
    isActive,
    onToggleActive
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
    return (
        <>
            <ActiveMenu onToggle={onToggleActive} isActive={isActive}/>
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

export default React.memo(Manage);