import React, { type ElementConfig } from 'react';
import Select, { components } from 'react-select';
import { cityOptions } from '../../lib/cities';
import { FiMapPin } from 'react-icons/fi';
import styles from './SelectStyle';

const DropdownIndicator = (props: ElementConfig<typeof components.DropdownIndicator>) => {
    return (
        <components.DropdownIndicator {...props}>
            <FiMapPin/>
        </components.DropdownIndicator>
    );
};

const label = (field) => {
    if (typeof field === 'string') {
        return field[0].toUpperCase() + field.slice(1)
    }
}
const valueFormat = (key, value) => {
    if (value === '') {
        return {
            label: label(key),
            value: key
        }
    }
    return {
        label: value,
        value,
    }
};

const City = ({ ride, field, id, onChange }) => {
    return (
        <Select
            classNamePrefix="select"
            id="to"
            styles={styles('flex: 1', '7rem')}
            options={cityOptions}
            value={valueFormat(field, ride[field])}
            onChange={(e) => onChange(e, field, ride.id)}
            autoFocus
            name={field}
            placeholder={label(field)}
            components={{ DropdownIndicator }}
        />
    );
};

const propsEqual = (prevProps, nextProps) => (
    prevProps.ride[prevProps.field] === nextProps.ride[nextProps.field]
)

export default React.memo(City, propsEqual);