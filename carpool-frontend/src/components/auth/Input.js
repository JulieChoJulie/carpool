import React from 'react';
import './Input.scss';
import { MdDone } from "react-icons/md";

const Input = ({ onChange, onBlur, error, type, form, name }) => {
    const errorMessage = {
        'usernameLength': `This must be longer than 4 characters.`,
        'username': `The username '${form.username}' is already taken.`,
        'email': 'The email you entered is already in use.',
        'passwordConfirm': 'These passwords do not match.'
    };

    let nameUpperCase = name.toUpperCase();
    if (nameUpperCase === 'PASSWORDCONFIRM') {
        nameUpperCase = 'PASSWORD CONFIRM' // add space
    }

    let inputType = name;
    let autoComplete = name;

    if (name === 'password' || name === 'passwordConfirm') {
        // for passwordConfirm -> input type = password
        inputType = name.slice(0, 8);
        autoComplete = "new-password";
    }

    // verify if the input needs check and error message
    const ownCheck = (
        type === 'signup' && (
            name === 'email' ||
            name === 'username' ||
            name === 'passwordConfirm'
        )
    );

    // check if the username is longer than 4 characters
    const usernameLength =
        (name === 'username' && form.username !== '') ? form.username.length > 4 : true;

    // verify if unique Check test is passed;
    const check = (
        !error[name] &&
        form[name] !== '' &&
        error[name] !== null &&
        usernameLength
    );


    return (
        <div className="subForm">
            <div className="onSameLine">
                <input
                    placeholder={nameUpperCase}
                    name={name}
                    auto-complete={autoComplete}
                    onChange={onChange}
                    value={form[name]}
                    onBlur={onBlur}
                    type={inputType}
                />
                { ownCheck && check && (<MdDone />) }
            </div>
            { !usernameLength && (
                <div className="error">{errorMessage.usernameLength}</div>

            )}
            { ownCheck && error[name] && (
                <div className="error">{errorMessage[name]}</div>
            )}

        </div>
    );
};

export default Input;