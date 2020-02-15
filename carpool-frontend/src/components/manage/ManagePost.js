import React from 'react';
import './ManagePost.scss';
import ManageRide from "./ManageRide";
import ManageButtons from './ManageButtons';

const ManagePost = ({ post, onAccept, onCancel, onRemove, onRemoveRide }) => {
    return (
        <div className="ManagePost">
            <ManageButtons onRemove={onRemove} id={post.id} isEdit={true} type='post'/>
            { post.rides.map(ride =>
                <ManageRide
                    key={ride.id}
                    ride={ride}
                    onAccept={onAccept}
                    onCancel={onCancel}
                    onRemoveRide={onRemoveRide}
                />
            )}
        </div>
    );
};

export default React.memo(ManagePost);