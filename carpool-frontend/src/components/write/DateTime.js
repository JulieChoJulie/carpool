import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import './DateTime.scss';

const DateTime = ({ date, onChange }) => {
    return (
        <div className="dateTime">
            <DateTimePicker
                onChange={onChange}
                value={date}
                clearIcon={null}
                minDate={new Date()}
                name="when"
            />
        </div>
    );
};

export default DateTime;