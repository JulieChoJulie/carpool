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


const Ride = ({ ride, onChange }) => {
    const valueFormat = (key, value) => {
        if (value === '') {
            const label = key[0].toUpperCase() + key.slice(1);
            return {
                label: label,
                value: key
            }
        }
        return {
            label: value,
            value,
        }
    }
      return (
        <div className="one-way">
            <div className="form-group fullWidth destination">
                <Select
                    classNamePrefix="select"
                    id="from"
                    styles={styles('flex: 1', '8rem')}
                    options={cityOptions}
                    value={valueFormat('from', ride.from)}
                    onChange={(e) => onChange(e, 'from', ride.id)}
                    autoFocus
                    placeholder="From"
                    components={{ DropdownIndicator }}
                />
                <IoIosArrowRoundForward className="arrow" />
                <Select
                    classNamePrefix="select"
                    id="to"
                    styles={styles('flex: 1', '7rem')}
                    options={cityOptions}
                    value={valueFormat('to', ride.to)}
                    onChange={(e) => onChange(e, 'to', ride.id)}
                    autoFocus
                    name="to"
                    placeholder="To"
                    components={{ DropdownIndicator }}
                />
            </div>
            <div className="form-group">
                <label style={{ position: 'inherit'}}>Leaving At</label>
                <DateTime date={ride.when} onChange={(e) => onChange(e, 'when', ride.id)}/>
            </div>
            <div className="form-group two">
                <label style={{ position: 'inherit'}}>Seats: </label>
                <Number seats={ride.seats} id={ride.id} onChange={onChange} />
                <div className="form-group price">
                    <label style={{ position: 'inherit'}}>Price: </label>
                    <span>$</span>
                    <input
                        name="price"
                        type="number"
                        value={ride.price}
                        onChange={(e) => onChange(e.target, 'price', ride.id)}
                    />
                    <span>&#47; seat</span>
                </div>
            </div>
        </div>
    );
};

export default Ride;