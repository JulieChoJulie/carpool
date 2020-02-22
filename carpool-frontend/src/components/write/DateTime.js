import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import './DateTime.scss';

const DateTime = ({ date, onChange, minDate, maxDate }) => {
    return (
        <div className="dateTime">
            <DateTimePicker
                onChange={onChange}
                value={date}
                clearIcon={null}
                minDate={minDate}
                maxDate={maxDate}
                name='when'
            />
        </div>
    );
};

const propsEqual = (prevProp, nextProp) => {
    return prevProp.date === nextProp.date
}

export default React.memo(DateTime, propsEqual);