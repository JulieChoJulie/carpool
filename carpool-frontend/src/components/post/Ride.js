import React, { type ElementConfig } from 'react';
import Select, { components } from 'react-select';
import { cityOptions } from '../../lib/cities';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { FiMapPin } from 'react-icons/fi';
import DateTime from './DateTime';
import Number from './Number';
import styles from './SelectStyle';

const city = cityOptions;

const DropdownIndicator = (props: ElementConfig<typeof components.DropdownIndicator>) => {
    return (
        <components.DropdownIndicator {...props}>
            <FiMapPin/>
        </components.DropdownIndicator>
    );
};


const Ride = ({ value, onChange }) => {
    return (
        <div className="one-way">
            <div className="form-group fullWidth destination">
                <Select
                    classNamePrefix="select"
                    id="from"
                    styles={styles('flex: 1', '8rem')}
                    options={cityOptions}
                    value={value}
                    onChange={onChange}
                    autoFocus
                    name="from"
                    placeholder="From"
                    components={{ DropdownIndicator }}
                />
                <IoIosArrowRoundForward className="arrow" />
                <Select
                    classNamePrefix="select"
                    id="to"
                    styles={styles('flex: 1', '7rem')}
                    options={cityOptions}
                    value={value}
                    onChange={onChange}
                    autoFocus
                    name="from"
                    placeholder="To"
                    components={{ DropdownIndicator }}
                />
            </div>
            <div className="form-group">
                <label style={{ position: 'inherit'}}>Leaving At</label>
                <DateTime />
            </div>
            <div className="form-group two">
                <label style={{ position: 'inherit'}}>Seats: </label>
                <Number seats="1"/>
                <div className="form-group price">
                    <label style={{ position: 'inherit'}}>Price: </label>
                    <span>$</span>
                    <input name="price" type="number"/>
                    <span>&#47; seat</span>
                </div>
            </div>
        </div>
    );
};

export default Ride;