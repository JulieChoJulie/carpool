import React from 'react';
import { MdSend } from 'react-icons/md';
import './CommentInsert.scss';

const CommentInsert = ({ onInsert, onChange, comment, user }) => {
    return (
        <form onSubmit={onInsert} className="commentInsert">
            <span className="username">@user:</span>
            <input placeholder="Comment here.." />
        <button type="submit"><MdSend/></button>
        </form>
    );
};

export default CommentInsert;