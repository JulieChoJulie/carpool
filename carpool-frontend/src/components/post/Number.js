import React from 'react';
import { TiPlus, TiMinus } from "react-icons/ti";
import './Number.scss';


const Number = ({ seats }) => {
    return (
        <div className="number">
            <TiPlus/>
            <span>{seats}</span>
            <TiMinus/>

        </div>
    );
};

export default Number;