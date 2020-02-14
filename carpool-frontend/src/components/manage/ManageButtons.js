import React, { useState } from 'react';
import AskRemoveModal from './AskRemoveModal';
import { Link } from "react-router-dom";
import { MdDelete, MdEdit } from 'react-icons/md';

const ManageButtons = ({ onRemove, postId }) => {
    const [modal, setModal] = useState(false);
    const onRemoveClick = () => {
        setModal(true);
    };

    const onCancel = () => {
        setModal(false);
    };

    const onConfirm = () => {
        setModal(false);
        onRemove(postId);
    };

    return (
        <div className="buttons">
            <Link className="editIcon" to={`/posts/${postId}/edit`}><MdEdit/></Link>
            <span className="deleteIcon" onClick={onRemoveClick}><MdDelete/></span>
            <AskRemoveModal
                visible={modal}
                onConfirm={onConfirm}
                onCancel={onCancel}
                obj='post'
            />
        </div>
    );
};

export default ManageButtons;