import React from 'react';
import RideBlock from './RideBlock';
import { MdPerson } from 'react-icons/md';
import { IoIosBody, IoIosCar } from "react-icons/io";
import { TiStarOutline, TiStarFullOutline } from 'react-icons/ti';
import { MdCheckCircle } from 'react-icons/md';
import './Post.scss';
import dateFormat from './dateFormat';
import ManageButtons from "../manage/ManageButtons";
import { Link } from 'react-router-dom';

const Post = ({
    post,
    status,
    postError,
    loading,
    toggleRide,
    error,
    errorMsg,
    isOwn,
    loggedInUser,
    onRemove,
    saveError,
    saveStatus,
    toggleSave
}) => {
    if (postError) {
        if (postError.status && postError.status === 404) {
            return <div className="post">The requested post does not exist.</div>
        }
        return <div className="post">Internal Error!</div>
    }

    if (loading || !post) {
        return null;
    }

    const rideStatus = (rideId) => {
        const rideIdStr = rideId.toString();
        if (status === null) {
            return null;
        }
        return (!status.hasOwnProperty(rideIdStr) ? '0' : status[rideIdStr]);
        // 0 => no request
        // 1 => booked
        // -1 => request sent
    }

    const { rides, notes, updatedAt, user, id } = post;
    const isVerified = user.isStudent
        && <span className="verified"><MdCheckCircle/></span>;

    return (
        <div className="post">
            <div className="first row">
                <span className="username">
                    <span className="photo">
                        <MdPerson />
                    </span>
                    <Link to={`/users/@${user.username}/profile`}>
                        @{user.username}{isVerified}
                    </Link>
                    <span className="date">
                        {dateFormat(updatedAt)}
                    </span>
                </span>
                <span className="button">
                    { loggedInUser
                    && (<span className="saveIcon" onClick={() => toggleSave(id)}>
                            {saveStatus ? <TiStarFullOutline/> : <TiStarOutline/>}
                        </span>)
                    }
                    {isOwn &&
                        <ManageButtons
                            onRemove={onRemove}
                            id={post.id}
                            isEdit={true}
                            isDetailedPage={true}
                            type="post"
                        />
                    }
                </span>
            </div>
            <div className="offering">
                {post.rides && post.rides[0] &&
                    (post.rides[0].offering ?
                        (<span><IoIosCar/>Offering</span>)
                    :(<span><IoIosBody/>Looking For</span>))
                }
            </div>
            <ul className="rideList second row">
            {rides.map((ride, index) => (
                <li key={index}>
                    <RideBlock user={loggedInUser} isOwn={isOwn} ride={ride} status={rideStatus(ride.id)} toggleRide={toggleRide} />
                </li>
            ))}
            </ul>
            {post.notes.length > 0 &&
                <div className="last row">
                    <div className="notes label">Notes:</div>
                    <div className="notes content">{notes}</div>
                </div>
            }
            {errorMsg(error, loggedInUser) !== '' && (
                <div className="error">{errorMsg(error, loggedInUser)}</div>
            )}
        </div>
    );
};

export default Post;