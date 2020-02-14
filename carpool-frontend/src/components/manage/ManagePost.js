import React from 'react';
import './ManagePost.scss';
import ManageRide from "./ManageRide";
import ManageButtons from './ManageButtons';
import Manage from "./Manage";

const ManagePost = ({ post, onAccept, onCancel, onRemove }) => {
    return (
        <div className="ManagePost">
            <ManageButtons onRemove={onRemove} postId={post.id}/>
            { post.rides.map(ride =>
                <ManageRide key={ride.id} ride={ride} onAccept={onAccept} onCancel={onCancel}/>
            )}
        </div>
    );
};

export default React.memo(ManagePost);