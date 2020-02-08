import React from 'react';
import { TiPlus, TiMinus } from "react-icons/ti";
import './Number.scss';


const Number = ({ seats, id, onChange }) => {
    return (
        <div className="number">
            <TiPlus/>
            <input value={seats} onChange={(e) => onChange(e.target, 'seats', id)}/>
            <TiMinus/>

        </div>
    );
};

export default React.memo(Number);