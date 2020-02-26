import React from 'react';
import Button from "./Button";
import './Error.scss';

const Error = ({ status }) => {
    const error = {
        '401': 'Unauthorized',
        '403': 'Forbidden',
        '404': 'Not Found',
        '402': 'No Posts Yet..'
    }
    return (
        <div className="errorBlock">
            {error[status]}...
            {status !== 402 &&
                <Button color='burgundy' fullWidth to="/">Go to homepage</Button>
            }
        </div>
    );
};

export default Error;