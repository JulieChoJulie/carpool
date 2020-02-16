import React, { useState } from 'react';
import AskRemoveModal from './AskRemoveModal';
import { Link } from "react-router-dom";
import { MdDelete, MdEdit } from 'react-icons/md';

const ManageButtons = ({ onRemove, id, isEdit, obj, type }) => {
    const [modal, setModal] = useState(false);
    const onRemoveClick = () => {
        setModal(true);
    };

    const onCancel = () => {
        setModal(false);
    };

    const onConfirm = () => {
        setModal(false);
        if(type === 'ride') {
            onRemove(obj.postId, obj.id)
        } else {
            onRemove(id);
        }
    };

    return (
        <div className="buttons">
            { isEdit && <Link className="editIcon" to={`/posts/${id}/edit`}><MdEdit/></Link>}
            <span className="deleteIcon" onClick={onRemoveClick}><MdDelete/></span>
            <AskRemoveModal
                visible={modal}
                onConfirm={onConfirm}
                onCancel={onCancel}
                obj={type}
            />
        </div>
    );
};

export default ManageButtons;