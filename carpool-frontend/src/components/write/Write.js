import React from 'react';
import './Write.scss';
import Responsive from '../common/Responsive';
import Button from "../common/Button";
import Ride from './Ride';
import Offering from './Offering';

const Write = ({ rides, onChange, isRoundTrip, onChangeRoundtrip, onSubmit }) => {
    return (
        <Responsive addclass="write">
            <div className="box writeBox">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="offering">Offering:</label>
                        <Offering offering={rides[0].offering} onChange={onChange}/>
                    </div>
                    <div className="form-group trip">
                        <input
                            type="radio"
                            id="one-way"
                            name="trip"
                            value={false}
                            checked={!isRoundTrip}
                            onChange={() => onChangeRoundtrip(false)}/>
                        <label htmlFor="one-way">One way</label>

                        <input
                            type="radio"
                            id="round-trip"
                            name="trip"
                            value={true}
                            checked={isRoundTrip}
                            onChange={() => onChangeRoundtrip(true)} />
                        <label htmlFor="round-trip">Round trip</label>
                    </div>
                    {isRoundTrip ?
                        rides.map((ride, index) =><li key={index}><Ride ride={ride} onChange={onChange}/></li>)
                        : <Ride ride={rides[0]} onChange={onChange}/>
                    }
                    <Button color="burgundy" fullWidth>POST</Button>
                </form>
            </div>
        </Responsive>
    );
};

export default React.memo(Write);