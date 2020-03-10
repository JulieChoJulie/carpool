import React from 'react';
import Button from "../common/Button";
import './VerificationCode.scss';

const VerificationCode = ({
    user,
    error,
    code,
    min,
    sec,
    time,
    onClickSend,
    onChange,
    onClickCompare,
}) => {
    if(!user) {
        return null;
    }

    return (
        <div className="template verificationCodeTemplate">
            <h2>Verify Your Email</h2>
            <div className="content">
                <form className="form">
                    {
                        user.isStudent &&
                            <div>
                                <div>Thank you.</div>
                                <div>
                                    Your email is successfully verified!
                                </div>
                                <Button to="/" fullWidth color="burgundy">Go to homepage</Button>
                            </div>
                    }
                    {
                        !user.isStudent && (
                         time ? (
                            <>
                                <div>
                                    Time remaining
                                    <span className="time">
                                        {min}:{ sec < 10 ? `0${ sec }` : sec }
                                    </span>
                                </div>
                                <div className="row code">
                                    <label>Code: </label>
                                    <input value={code} onChange={onChange}/>
                                    <Button
                                        onClick={onClickCompare}
                                        color="white"
                                    >
                                        Confirm
                                    </Button>
                                </div>
                                <div className="error">{error}</div>
                                <p>If you have not received any email, please click
                                    the 'Send' button.</p>
                                <div className="end">
                                    <Button
                                        onClick={onClickSend}
                                        color="white"
                                    >
                                        Send
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    Please click the 'Verify' button to receive
                                    an email with the verification code.
                                </div>
                                <div className="onSameLine">
                                    <label>Email:</label> <span>{user.email}</span>
                                    <Button
                                        onClick={onClickSend}>
                                        Verify
                                    </Button>
                                </div>
                                <div className="error">{error}</div>
                                <a href='/'>I will verify my email next time</a>
                            </>
                        )
                    )}
                </form>
            </div>
        </div>
    );
};

export default VerificationCode;