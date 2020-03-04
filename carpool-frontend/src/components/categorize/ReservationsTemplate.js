import React from 'react';
import './ReservationsTemplate.scss';

const ReservationsTemplate = ({ children }) => {
    return (
        <div className="reservationsTemplate template">
            <h2>My Reservations</h2>
            { children }
        </div>
    );
};

export default ReservationsTemplate;