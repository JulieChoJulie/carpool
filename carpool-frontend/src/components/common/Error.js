import React from 'react';
import Button from "./Button";
import './Error.scss';

const Error = ({ status }) => {
    const error = {
        '401': 'Unauthorized',
        '403': 'Forbidden',
        '404': 'Not Found',
    }
    console.log(status);
    return (
        <div className="errorBlock">
            {error[status]}...
            <Button color='burgundy' fullWidth to="/">Go to homepage</Button>
        </div>
    );
};

export default Error;