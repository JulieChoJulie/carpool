import React, {useState} from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';

const Notes = ({ onChange, notes }) => {
    const [isNotes, setNotes] = useState(false);

    return (
        <div className="addDetails" onClick={() => setNotes(true)}>
            <IoIosAddCircleOutline />Add Details
            {isNotes &&
            <div className="details">
                <textarea
                    type="text"
                    value={notes}
                    onChange={(e) => onChange(e.target.value, 'notes')}
                />
            </div>
            }
        </div>
    );
};

export default Notes;