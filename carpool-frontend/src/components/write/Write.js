import React from 'react';
import Select from 'react-select';
import './Write.scss';
import Responsive from '../common/Responsive';
import Button from "../common/Button";
import Ride from './Ride';
import styles from './SelectStyle';

const optionsOffering = [
    {value: true, 'label': 'Offering'},
    {value: false, 'label': 'Looking for'}
];

const offeringValue = (value) => {
    const label = value ? 'Offering' : 'Looking for';
    return {
        value: value,
        label: label
    }
};

const Write = ({ rides, onChange, isRoundTrip, offering , onChangeRoundtrip, onSubmit }) => {
    return (
        <Responsive addclass="write">
            <div className="box writeBox">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label for="offering">Offering:</label>
                        <Select
                            classNamePrefix="select"
                            id="offering"
                            styles={styles('8')}
                            options={optionsOffering}
                            value={offeringValue(offering)}
                            onChange={(e) => onChange(e, 'offering')}
                            autoFocus
                            name="offering"
                        />
                    </div>
                    <div className="form-group trip">
                        <input
                            type="radio"
                            id="one-way"
                            name="trip"
                            value={false}
                            checked={!isRoundTrip}
                            onChange={() => onChangeRoundtrip(false)}/>
                        <label for="one-way">One way</label>

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
                        rides.map(ride => <Ride ride={ride} key={ride.id} onChange={onChange}/>)
                        : <Ride ride={rides[0]} key={rides[0].id} onChange={onChange}/>
                    }
                <Button color="burgundy" fullWidth>POST</Button>
                </form>
            </div>
        </Responsive>
    );
};

export default React.memo(Write);