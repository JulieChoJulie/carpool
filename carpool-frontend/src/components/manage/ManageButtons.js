import React, { useState } from 'react';
import AskRemoveModal from './AskRemoveModal';
import { Link } from "react-router-dom";
import { MdDelete } from 'react-icons/md';
import { TiEdit } from 'react-icons/ti';
import { IoIosBody, IoIosCar } from "react-icons/io";

const ManageButtons = ({ offering, onRemove, id, isEdit, obj, type, isDetailedPage }) => {
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
            { isEdit && !isDetailedPage
                && <div className="offering">
                    {offering ?
                        (<span><IoIosCar/>Offering</span>)
                        :(<span><IoIosBody/>Looking For</span>)
                    }
                </div>
            }
            <div>
                { isEdit && <Link className="editIcon" to={`/posts/${id}/edit`}><TiEdit/></Link>}
                <span className="deleteIcon" onClick={onRemoveClick}><MdDelete/></span>
                <AskRemoveModal
                    visible={modal}
                    onConfirm={onConfirm}
                    onCancel={onCancel}
                    obj={type}
                />
            </div>
        </div>
    );
};

export default ManageButtons;