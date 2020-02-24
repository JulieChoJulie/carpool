import React from 'react';
import Ride from "./Ride";
import './Post.scss';
import dateFormat from "../post/dateFormat";
import Button from "../common/Button";
import { IoIosCar, IoIosBody } from 'react-icons/io';

const Post = ({ post, status }) => {
    const to = '/posts/' + post.id;
    return (
        <div className="postBlock">
            <div className="firstRow">
                <span className="username">@{post.user.username}</span>
                <span className="postWhen">{dateFormat(post.updatedAt)}</span>
            </div>
            <div className="offering">
                {post.rides && post.rides[0] &&
                (post.rides[0].offering ?
                    (<span><IoIosCar/>Offering</span>)
                    :(<span><IoIosBody/>Looking For</span>))
                }
            </div>
            { post.rides.map(ride =>
                <Ride key={ride.id} status={status} ride={ride}/>)
            }
            <div className="right"><Button color="white" to={to}>Details &#8594;</Button></div>
        </div>
    );
};

export default React.memo(Post);