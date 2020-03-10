import React from 'react';
import Ride from "./Ride";
import './Post.scss';
import dateFormat from "../post/dateFormat";
import Button from "../common/Button";
import { IoIosCar, IoIosBody } from 'react-icons/io';
import { TiStarOutline, TiStarFullOutline } from 'react-icons/ti';
import { MdCheckCircle } from 'react-icons/md';
import { Link } from "react-router-dom";

const Post = ({ post, status, onToggleSave, user, filterActive }) => {
    const to = '/posts/' + post.id;
    const isSaved = user
        && post.SaveUsers
        && post.SaveUsers.filter(u => u.id === parseInt(user.id)).length > 0;
    const isVerified = post.user.isStudent
        && <span className="verified"><MdCheckCircle/></span>;

    return (
        <div className="postBlock">
            <div className="firstRow">
                <Link to={`/users/@${post.user.username}/profile`}>
                    <span className="username">@{post.user.username}{isVerified}</span>
                </Link>
                <span className="postWhen">{dateFormat(post.updatedAt)}</span>
                {user &&
                    <span className="save" onClick={() => onToggleSave(post.id, isSaved)}>
                        {isSaved ? <TiStarFullOutline/> : <TiStarOutline/>}
                    </span>
                }
            </div>
            <div className="offering">
                {post.rides && post.rides[0] &&
                (post.rides[0].offering ?
                    (<span><IoIosCar/>Offering</span>)
                    :(<span><IoIosBody/>Looking For</span>))
                }
            </div>
            { post.rides.map(ride =>
                <Ride key={ride.id} status={status} ride={ride} filterActive={filterActive}/>)
            }
            <div className="right"><Button color="white" to={to}>Details &#8594;</Button></div>
        </div>
    );
};

export default React.memo(Post);