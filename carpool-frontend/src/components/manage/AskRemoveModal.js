import React from 'react';
import AskModal from '../common/AskModal';

const AskRemoveModal = ({ visible, onConfirm, onCancel, obj }) => {
    return (
        <AskModal
            visible={visible}
            onConfirm={onConfirm}
            onCancel={onCancel}
            title="DELETE"
            description={`Are you sure to delete this ${obj}?`}
        />
    );
};

export default AskRemoveModal;