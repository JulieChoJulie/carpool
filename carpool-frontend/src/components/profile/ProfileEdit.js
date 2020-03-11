import React from 'react';
import dateFormat from "../post/dateFormat";
import Button from "../common/Button";

const ProfileEdit = ({
    user,
    onClick,
    onChange,
    editCell,
    editPassword,
    editUsername,
    editEmail,
    onSubmit
}) => {
    const editButton = (onClick) => (
        <span className="button">
            <Button small color="burgundy" onClick={onClick}>Edit</Button>
        </span>
    );

    const submitButton = (onSubmit) => (
        <span className="button">
            <Button small color="burgundy" onClick={onSubmit}>Submit</Button>
        </span>
    )

    return (
        <div className="content">
            <div className="username">
            <span className="name">
                <span className="label">Username: </span>
                <span className="username">@{user.username}</span>
                { editUsername ? submitButton(onSubmit) : editButton(onClick) }
            </span>
                {isVerified}
                { isMyProfile ? myProfile : notMyProfile }
            </div>
            <div className="email">
                <span className="label">Email: </span>
                <span className="">{user.email}</span>
                { editButton(onClick) }
                <div className="verification">
                    <span className="label">Email: </span>
                    <span className="">{user.email}</span>
                </div>
            </div>
            <div className="password">
                <span className="label">Password: </span>
                { editButton(onClick) }
                <span className=""><input type="password"/></span>
            </div>
            <div className="cell">
                <span className="label">Cell: </span>
                <span className="">{user.cell ? user.cell : 'N/A' }</span>
            </div>
        </div>
    );
};

export default ProfileEdit;