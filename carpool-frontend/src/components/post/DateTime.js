import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import './DateTime.scss';

const DateTime = () => {
    const [date, setDate] = useState(new Date());
    const onChange = date => setDate(date);

    return (
        <div>
            <DateTimePicker
                onChange={onChange}
                value={date}
                clearIcon={null}
                minDate={new Date()}
            />
        </div>
    );
};

export default DateTime;