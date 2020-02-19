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


const SearchBlock = () => {
    const [range, setRange] = useState({ min: 10, max: 30 });

    const onChange = () => {

    };

    return (
        <div className="searchBlock">
            <div className="form-group">
                <label htmlFor="offering">Offering:</label>
                <Offering offering={true} onChange={onChange}/>
            </div>
            <div className="form-group where">
                <label htmlFor="offering">Where:</label>
                <div className="cities">
                    <City ride="" field="from" id="0" onChange={onChange}/>
                    <City ride="" field="to" id="0" onChange={onChange}/>
                </div>
            </div>

            <div className="form-group when">
                <div className="when">
                    <label style={{ position: 'inherit'}}>From: </label>
                    <DateTime date={new Date()} onChange={onChange}/>
                </div>
                <div className="when">
                    <label style={{ position: 'inherit'}}>To: </label>
                    <DateTime date={new Date()} onChange={onChange}/>
                </div>
            </div>
            <div className="form-group two">
                <label style={{ position: 'inherit'}}>Seats: </label>
                <Number seats="0" id="0" onChange={onChange}/>
            </div>
            <div className="form-group price two">
                <label style={{ position: 'inherit'}}>Price: </label>
                <InputRange
                    formatLabel={value => `$${value}`}
                    maxValue={100}
                    minValue={0}
                    value={range}
                    onChange={value => setRange(value)}
                    allowSameValues={true}
                />
            </div>
            <Button fullWidth color="burgundy">Search</Button>
        </div>
    );
};

export default SearchBlock;