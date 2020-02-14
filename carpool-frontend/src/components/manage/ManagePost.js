import React from 'react';
import './ManagePost.scss';
import ManageRide from "./ManageRide";
import { MdDelete, MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';

const ManagePost = ({ post, onAccept, onCancel, onRemove }) => {
    return (
        <div className="ManagePost">
            <div className="buttons">
                <Link className="editIcon" to={`/posts/${post.id}/edit`}><MdEdit/></Link>
                <span className="deleteIcon" onClick={() => onRemove(post.id)}><MdDelete/></span>
            </div>
            { post.rides.map(ride =>
                <ManageRide key={ride.id} ride={ride} onAccept={onAccept} onCancel={onCancel}/>
            )}
        </div>
    );
};

export default React.memo(ManagePost);