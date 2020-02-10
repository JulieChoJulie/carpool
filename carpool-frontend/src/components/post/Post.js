import React from 'react';
import Ride from './Ride';
import { MdPerson, MdDelete } from 'react-icons/md';
import { IoIosBody, IoIosCar } from "react-icons/io";
import { TiEdit } from 'react-icons/ti';
import { FiDownload } from 'react-icons/fi';
import './Post.scss';
import dateFormat from './dateFormat';

const Post = ({ post }) => {
    const { rides, notes, updatedAt, user } = post;
    return (
        <div className="post">
            <div className="first row">
                <span className="username">
                    <MdPerson /> @{user.username} <span className="date">{dateFormat(updatedAt)}</span>
                </span>
                <span className="buttons">
                    <span className="saveIcon"><FiDownload/></span>
                    <span className="editIcon"><TiEdit/></span>
                    <span className="deleteIcon"><MdDelete/></span>

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
                <li key={index}><Ride ride={ride} when={dateFormat(ride.when)} /></li>
            ))}
            </ul>
            {post.notes.length > 0 &&
                <div className="last row">
                    <div className="notes label">Notes:</div>
                    <div className="notes content">{notes}</div>
                </div>
            }
        </div>
    );
};

export default Post;