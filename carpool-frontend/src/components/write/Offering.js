import React from 'react';
import Select from 'react-select';
import styles from './SelectStyle';

const optionsOffering = [
    {value: true, 'label': 'Offering'},
    {value: false, 'label': 'Looking for'}
];

const offeringValue = (value) => {
    const label = value ? 'Offering' : 'Looking for';
    return {
        value: value,
        label: label
    }
};

const Offering = ({ onChange, offering }) => {
    return (
        <Select
            classNamePrefix="select"
            id="offering"
            styles={styles('8')}
            options={optionsOffering}
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