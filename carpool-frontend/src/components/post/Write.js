import React, { type ElementConfig } from 'react';
import Select, { components } from 'react-select';
import './Write.scss';
import Responsive from '../common/Responsive';
import Button from "../common/Button";
import { cityOptions } from '../../lib/cities';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { FiMapPin } from 'react-icons/fi';
import DateTime from './DateTime';
import Number from './Number';

const optionsOffering = [
    {value: true, 'label': 'Offering'},
    {value: false, 'label': 'Looking for'}
];

const city = cityOptions;

const DropdownIndicator = (props: ElementConfig<typeof components.DropdownIndicator>) => {
        return (
            <components.DropdownIndicator {...props}>
                <FiMapPin/>
            </components.DropdownIndicator>
        );
};

const styles = (size, minWidth) => ({
    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted #6c282f',
        color: state.isSelected ? '#6c282f' : '#20292f',
        background: state.isSelected ? '#f5f4f2' : 'white',
        padding: 2,
    }),
    control: (provided, state) => {
       return {
        ...provided,
           '&:hover': {borderColor: "#6c282f", 'border': '2px solid #6c282f'},
           'boxShadow': null,
           'borderColor': '#9a5762'
    }},
    container: (provided, state) => {
        const res = {
            ...provided,
            'marginTop': '0.2rem',
            'fontSize': '0.8rem',
        };
        (size === 'flex: 1' ? res.flex = 1 : (res.width = `${size}rem`));
        if (minWidth) {
            res['min-width'] = `${minWidth}`
        }
        return res;
    },
    menu: (provided, state) => {
        return {
            ...provided,
            'marginBottom': 0,
            'marginTop': 0,
        }
    },
    menuList: (provided, state) => {
        return {
            ...provided,
            'paddingBottom': 0,
            'paddingTop': 4
        }
    },
    valueContainer: (provided, state) => {
        return {
            ...provided,
            'padding': '0 5px'
        }
    }
});

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
                            styles={styles('flex: 1', '8rem')}
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
                    <div className="form-group">
                        <label style={{ position: 'inherit'}}>Seats: </label>
                        <Number seats="1"/>
                    </div>
                    <div className="form-group price">
                        <label style={{ position: 'inherit'}}>Price: </label>
                        <span>$</span>
                        <input name="price" type="number"/>
                        <span>&#47; seat</span>
                    </div>
                </form>
                <Button color="burgundy" fullWidth>POST</Button>
            </div>
        </Responsive>
    );
};

export default Write;