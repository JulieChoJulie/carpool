import React, { useState } from 'react';
import Button from '../common/Button';
import AskCancelModal from './AskCancelModal';
import { FiSend } from 'react-icons/fi';
import { IoMdCheckboxOutline } from 'react-icons/io';


const CancelButton = ({ onClick, id, status }) => {
    const [modal, setModal] = useState(false);
    const obj = {
        '-1': [
            'request',
            <FiSend/>,
        ],
        '1': [
            'reservation',
            <IoMdCheckboxOutline/>,
        ]
    };
    const onCancelClick = () => {
        setModal(true);
        console.log('onCancleClick')
    };

    const onCancel = () => {
        setModal(false);
    };

    const onConfirm = () => {
        setModal(false);
        onClick(id);
        console.log(modal)
    };

    return ( !status ? null :
        <div className="reserve">
            <span onClick={onCancelClick}>{obj[status][1]}</span>
            <span className="button">
                <Button small color="white" onClick={onCancelClick}>Cancel</Button>
            </span>
            <AskCancelModal
                visible={modal}
                onConfirm={onConfirm}
                onCancel={onCancel}
                type={obj[status][0]}
            />
        </div>
    );
};

export default CancelButton;