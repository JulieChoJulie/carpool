import React from 'react';
import Button from "../common/Button";
import { MdCheckCircle } from 'react-icons/md';
import dateFormat from "../post/dateFormat";

const UserInfo = ({ user, isMyProfile, onClickMessage }) => {
    const isVerified = user.isStudent
        && <span className="verified"><MdCheckCircle/></span>;

    // const myProfile = (
    //     <span className="message-icon">
    //         <span><Button small color="white" to="/my-profile/edit">Edit My Profile</Button></span>
    //     </span>
    // );
    const myProfile = null;

    const notMyProfile =  (
        <span className="message-icon">
                    <span>
                        <Button
                            small
                            color="white"
                            onClick={() => onClickMessage({
                                userId: user.id.toString(),
                                rideId: false
                            })}
                        >
                            Message
                        </Button>
                    </span>
        </span>
    );

    return (
        <div className="userInfo">
            <div className="username">
                <span className="name">
                    <span className="label">Username: </span>
                        <span className="username">@{user.username}</span>
                </span>
                {isVerified}
                { isMyProfile ? myProfile : notMyProfile }
            </div>
            <div className="email">
                <span className="label">Email: </span>
                <span className="">{user.email}</span>
            </div>
            <div className="join">
                <span className="label">Join: </span>
                <span className="">{dateFormat(user.createdAt)}</span>
            </div>
            <div className="cell">
                <span className="label">Cell: </span>
                <span className="">{user.cell ? user.cell : 'N/A' }</span>
            </div>
            <div className="history">
                <span className="history">
                    <span className="label">History: </span>
                    <span>The numbers of completed trips</span>
                </span>
            </div>
        </div>
    );
};

export default UserInfo;