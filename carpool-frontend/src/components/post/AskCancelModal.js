import React from 'react';
import AskModal from '../common/AskModal';

const AskCancelModal = ({ visible, onConfirm, onCancel, type }) => {
    const typeCapital = type.toUpperCase();
    return (
        <AskModal
            visible={visible}
            onConfirm={onConfirm}
            onCancel={onCancel}
            title={`CANCEL ${typeCapital}`}
            description={`Are you sure to cancel this ${type}?`}
        />
    );
};

export default AskCancelModal;