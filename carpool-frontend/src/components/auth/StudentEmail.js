import React from 'react';
import Button from '../common/Button';

const StudentEmail = ({
    isStudentEmail,
    studentEmail,
    onClick,
    isStudentEmailError,
    onChange,
    onClickRadio,
    onSwitchAddress,
    ownEmail,
    emailAddress,
    onClickNext,
    error
}) => {
    const emailList = [
        '@edu.uwaterloo.ca',
        '@mail.utoronto.ca',
        '@yorku.ca',
        '@mcmaster.ca',
        '@mylaurier.ca',
        '@uwo.ca',
        '@ryerson.ca',
    ];
    return (
        <div className="AuthFormBlock">
            <form onSubmit={onClick}>
                <h3>Enter your university email</h3>
                <div>
                    <input
                        type="radio"
                        id="true"
                        name="haveStudentEmail"
                        value={true}
                        onClick={() => {onClickRadio(true)}}
                        defaultChecked />
                    <label htmlFor="true">I have a university email.</label>
                </div>
                <input
                    placeholder=''
                    name='studentEmail'
                    onChange={onChange}
                    value={studentEmail}
                />
                <select id="emails" value={emailAddress} onChange={onSwitchAddress}>
                    {
                        emailList.map((address, index) =>
                            <option key={index} value={address}>{address}</option>
                        )
                    }
                </select>

                <div>
                    <input
                        type="radio"
                        id="false"
                        name="haveStudentEmail"
                        value={false}
                        onClick={() => onClickRadio(false)}/>
                    <label htmlFor="false">I do not have a university email.</label>
                </div>
                <div className="error">
                    {error}
                </div>
                <Button color="burgundy" fullWidth onClick={onClickNext}>Next</Button>
            </form>
        </div>
    );
};

export default StudentEmail;