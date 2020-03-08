import React from 'react';
import Button from "../common/Button";
const VerificationCode = ({
    VerificationCode,
    ownEmail,
    studentEmail,
    emailAddress,
    onVerification,
    error
}) => {
    const email = studentEmail + emailAddress;

    return (
        <div className="verificationCode">
            <div className="email">{email}</div>
            <Button onClick={() => {}}/>
        </div>
    );
};

export default VerificationCode;