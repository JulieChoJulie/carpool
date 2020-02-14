import React from 'react';
import Button from './Button';
import './AskModal.scss';

const AskModal = ({
    visible,
    title,
    description,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
}) => {
    if (!visible) return null;

    return (
        <div className="askModalTemplate">
            <div className="askModalBlock">
                <h2>{title}</h2>
                <p>{description}</p>
                <div className="buttons">
                    <Button className="button modal" color="burgundy" onClick={onCancel}>{cancelText}</Button>
                    <Button className="button modal" color="burgundy" onClick={onConfirm}>{confirmText}</Button>
                </div>
            </div>
        </div>
    );
};

export default AskModal;