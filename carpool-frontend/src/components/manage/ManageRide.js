import React from 'react';
import Passenger from "./Passenger";
import Request from "./Request";
import Ride from '../post/Ride';
import './ManageRide.scss';
import { MdDelete, MdEdit } from 'react-icons/md';
import { TiEdit } from 'react-icons/ti';
import { AiFillSetting } from 'react-icons/ai';

const ManageRide = ({ ride, onAccept, onCancel }) => {
    return (
        <div className="ManageRide">
            <div className="reservation">
                <div className="item requests">
                    <div className="label">Requests Waiting</div>
                    {ride.RequestUsers.length === 0 && 'No requests.'}
                    { ride.RequestUsers.map(request =>
                        <Request key={ request.id } request={ request } onAccept={onAccept}/>
                    )}
                </div>
                <div className="item passengers">
                    <div className="label">Confirmed Passengers</div>
                    {ride.PartnerUsers.length === 0 && 'No passengers.'}
                    { ride.PartnerUsers.map(partner =>
                        <Passenger key={ partner.id } passenger={ partner } onCancel={onCancel}/>
                    )}
                </div>
            </div>
            <div className="rideBlock">
                <Ride ride={ ride } />
                <span className="button">
                    <span className="deleteIcon"><MdDelete/></span>
                </span>
            </div>
        </div>
    );
};

export default React.memo(ManageRide);