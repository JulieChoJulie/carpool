import React from 'react';
import './ManagePost.scss';
import ManageRide from "./ManageRide";
import ManageButtons from './ManageButtons';
import Button from "../common/Button";

const ManagePost = ({ post, onAccept, onCancel, onCancelRequest, onRemove, onRemoveRide }) => {
    const to = '/posts/' + post.id;
    return (
        <div className="ManagePost">
            <ManageButtons onRemove={onRemove} id={post.id} isEdit={true} type='post'/>
            { post.rides.map(ride =>
                <ManageRide
                    key={ride.id}
                    ride={ride}
                    onAccept={onAccept}
                    onCancel={onCancel}
                    onCancelRequest={onCancelRequest}
                    onRemoveRide={onRemoveRide}
                />
            )}
            <div className="right"><Button color="white" to={to}>Details &#8594;</Button></div>
        </div>
    );
};

export default React.memo(ManagePost);