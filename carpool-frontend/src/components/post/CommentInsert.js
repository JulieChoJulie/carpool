import React from 'react';
import { MdSend } from 'react-icons/md';
import './CommentInsert.scss';

const CommentInsert = ({ onInsert, onChange, comment, user }) => {
    if (!user) {
        return (
          <form className="commentInsert">
              <input
                  className="readOnly"
                  readOnly
                  value="Please log in to leave a comment."
              />
          </form>
        );
    } else {
        return (
            <form onSubmit={onInsert} className="commentInsert">
                <span className="username">@{user.username}:</span>
                <input
                    placeholder="Comment here.."
                    name="comment"
                    value={comment}
                    onChange={onChange}
                />
                <button type="submit"><MdSend/></button>
            </form>
        );
    }
};

export default CommentInsert;