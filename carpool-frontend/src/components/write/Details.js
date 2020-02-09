import React, {useState} from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';

const Details = ({ onChange, details }) => {
    const [isDetails, setDetails] = useState(false);

    return (
        <div className="addDetails" onClick={() => setDetails(true)}>
            <IoIosAddCircleOutline />Add Details
            {isDetails &&
            <div className="details">
                <textarea
                    type="text"
                    value={details}
                    onChange={(e) => onChange(e.target.value, 'details')}
                />
            </div>
            }
        </div>
    );
};

export default Details;