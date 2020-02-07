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

const Write = ({value, onChange}) => {
    return (
        <Responsive addclass="write">
            <div className="box writeBox">
                <form>
                    <div className="form-group">
                        <label for="offering">Offering:</label>
                        <Select
                            classNamePrefix="select"
                            id="offering"
                            styles={styles('8')}
                            options={optionsOffering}
                            value={value}
                            onChange={onChange}
                            autoFocus
                            name="offering"
                        />
                    </div>
                    <div className="form-group trip">
                        <input type="radio" id="one-way" name="trip" />
                        <label for="one-way">One way</label>

                        <input type="radio" id="round-trip" name="trip" />
                        <label htmlFor="round-trip">Round trip</label>
                    </div>
                    <Ride value={value} onChange={onChange} />
                    <Ride value={value} onChange={onChange}/>
                </form>
                <Button color="burgundy" fullWidth>POST</Button>
            </div>
        </Responsive>
    );
};

export default Write;