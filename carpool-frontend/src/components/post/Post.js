import React from 'react';
import Ride from './Ride';
import Button from "../common/Button";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import './Post.scss';


const Post = ({ post }) => {
    const { rides, notes, createdAt, user } = post;
    return (
        <div className="post">
            <div className="first row">
                <span className="username">
                    {user.username}
                    <Button color="white">Chat</Button>
                </span>
                <span className="buttons">
                    <Button color="white">Edit</Button>
                    <span className="saveIcon"><IoIosHeartEmpty/> Save</span>
                </span>
            </div>

            <ul className="rideList second row">
            {post.rides.map((ride, index) => (
                <li><Ride key={index} ride={ride} /></li>
            ))}
            </ul>
            <div className="last row">{notes}</div>
        </div>
    );
};

export default Post;