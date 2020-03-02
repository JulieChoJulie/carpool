import React from 'react';
import Passenger from "./Passenger";
import Request from "./Request";
import Ride from '../post/Ride';
import ManageButtons from './ManageButtons';
import './ManageRide.scss';

const ManageRide = ({ ride, onAccept, onCancel, onCancelRequest, onRemoveRide }) => {
    return (
        <div className="ManageRide">
            <div className="reservation">
                <div className="item requests">
                    <div className="label">Requests Waiting</div>
                    {ride.RequestUsers.length === 0 && 'No requests.'}
                    { ride.RequestUsers.map(request =>
                        <Request key={ request.id } request={ request } onAccept={onAccept} onCancelRequest={onCancelRequest} />
                    )}
                </div>
                <div className="item passengers">
                    <div className="label">{ride.offering? 'Passengers' : 'Drivers'}</div>
                    {ride.PartnerUsers.length === 0 && ride.offering? 'No Passengers' : 'No Drivers'}
                    { ride.PartnerUsers.map(partner =>
                        <Passenger key={ partner.id } passenger={ partner } onCancel={onCancel}/>
                    )}
                </div>
            </div>
            <div className="rideBlock">
                <Ride ride={ ride } />
                <ManageButtons
                    onRemove={onRemoveRide}
                    obj={ride}
                    isEdit={false}
                    type='ride'
                />
                {/*<span className="button">*/}
                    {/*<span className="deleteIcon"><MdDelete/></span>*/}
                {/*</span>*/}

            </div>
        </div>
    );
};

export default React.memo(ManageRide);