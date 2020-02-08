import React from 'react';
import { IoIosArrowRoundForward } from 'react-icons/io';
import DateTime from './DateTime';
import Number from './Number';
import City from './City';

const Ride = ({ ride, onChange }) => {
      return (
        <div className="one-way">
            <div className="form-group fullWidth destination">
                <City ride={ride} field="from" id={ride.id} key={`${ride.id} from`} onChange={onChange} />
                <IoIosArrowRoundForward className="arrow" />
                <City ride={ride} field="to" id={ride.id} key={`${ride.id} to`} onChange={onChange} />
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

export default React.memo(Ride);