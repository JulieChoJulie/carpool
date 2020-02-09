import React, { useState } from 'react';
import { TiPlus, TiMinus } from "react-icons/ti";
import './Number.scss';

const Number = ({ seats, id, onChange }) => {
    const [num, setNum] = useState(seats);
    const onIncrease = async () => {
        await setNum(num + 1);
        onChange({ value: num + 1 }, 'seats', id);
    };

    const onDecrease = () => {
        if ((num - 1 ) >= 1) {
            setNum(num - 1);
            onChange({ value: num - 1 }, 'seats', id);
        }
    };
    return (
        <div className="number">
            <TiMinus onClick={onDecrease}/>
            <input value={num} readOnly/>
            <TiPlus onClick={onIncrease}/>
        </div>
    );
};

export default React.memo(Number);