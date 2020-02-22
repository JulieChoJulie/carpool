import React, { useState } from 'react';
import InputRange from 'react-input-range';
import DateTime from "../write/DateTime";
import City from "../write/City";
import Offering from "../write/Offering";
import Number from "../write/Number";
import { IoIosArrowRoundForward } from 'react-icons/io';
import './SearchBlock.scss';
import "react-input-range/lib/css/index.css"
import Button from "../common/Button";


const SearchBlock = ({ criteria, onChange, onSubmit }) => {
    const [range, setRange] = useState({ min: criteria.price[0], max: criteria.price[1] });
    const [display, setDisplay] = useState({
       seats: false,
       offering: false,
       price: false,
       when: false,
       from: false,
        to: false,
    });

    return (
        <form className="searchBlock" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
                <label htmlFor="offering">Offering:</label>
                <Offering offering={criteria.offering} onChange={onChange}/>
            </div>
            <div className="form-group where">
                <label htmlFor="offering">Where:</label>
                <div className="cities">
                    <City ride={criteria} field="from" id="0" onChange={onChange}/>
                    <City ride={criteria} field="to" id="0" onChange={onChange}/>
                </div>
            </div>

            <div className="form-group when">
                <div className="when">
                    <label style={{ position: 'inherit'}}>From: </label>
                    <DateTime
                        date={criteria.when[0]}
                        onChange={(e) => onChange(e, 'when', 0)}
                        maxDate={criteria.when[1]}
                    />
                </div>
                <div className="when">
                    <label style={{ position: 'inherit'}}>To: </label>
                    <DateTime
                        date={criteria.when[1]}
                        onChange={(e) => onChange(e, 'when', 1)}
                        minDate={criteria.when[0]}
                        />
                </div>
            </div>
            <div className="form-group two">
                <label style={{ position: 'inherit'}}>Seats: </label>
                <Number seats={criteria.seats} id="0" onChange={onChange}/>
            </div>
            <div className="form-group price two">
                <label style={{ position: 'inherit'}}>Price: </label>
                <InputRange
                    formatLabel={value => `$${value}`}
                    maxValue={100}
                    minValue={0}
                    value={range}
                    onChange={value => {setRange(value); onChange({ value: [value.min, value.max] }, 'price')}}
                    allowSameValues={true}
                />
            </div>
            <Button fullWidth color="burgundy">Search</Button>
        </form>
    );
};

export default SearchBlock;