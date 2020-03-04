import React from 'react';
import Select from 'react-select';
import styles from './SelectStyle';

const optionsOffering = [
    {value: true, 'label': 'Offering'},
    {value: false, 'label': 'Looking for'},
];

const filterOptions = [
    ...optionsOffering,
    {value:'', 'label': 'Any'},
]

const offeringValue = (value) => {
    let label;
    if (value === '') {
        label = 'Any';
    } else if (value === true) {
        label = 'Offering';
    } else {
        label = 'Looking for';
    }
    return {
        value: value,
        label: label
    }
};

const Offering = ({ onChange, offering, isFilter }) => {
    return (
        <Select
            classNamePrefix="select"
            id="offering"
            styles={styles('8')}
            options={isFilter ? filterOptions : optionsOffering}
            value={offeringValue(offering)}
            onChange={(e) => onChange(e, 'offering')}
            autoFocus
            name="offering"
        />
    );
};

const propsEqual = (prevProps, nextProps) => {
    return prevProps.offering === nextProps.offering;
}

export default React.memo(Offering, propsEqual);