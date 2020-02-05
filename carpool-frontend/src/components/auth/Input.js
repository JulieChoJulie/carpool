import React from 'react';
import './Input.scss';
import { MdDone } from "react-icons/md";


const Input = ({ onChange, onBlur, error, type, form, name }) => {
    const errorMessage = {
        'emailValidation': 'This is not a valid email address.',
        'usernameLength': `This must be longer than 4 characters.`,
        'username': `The username '${form.username}' is already taken.`,
        'email': 'The email you entered is already in use.',
        'passwordConfirm': 'These passwords do not match.',
        'password': 'The password must include at least one upper case and lower case and it must be longer than 6 characters.'
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
        type === 'signup' && name !== 'cell'
    );

    // check if the username is longer than 4 characters
    const usernameLengthCheck =
        (name === 'username' && form.username !== '') ? form.username.length > 4 : true;

    const emailValidation =
        (name === 'email' ? !error.emailValidation : true);

    // check if the password is longer than 6 characters
    // and if the password has at least one upper case
    // and if the password has at least one lower case
    let passwordCheck = true;
    if ((name === 'password' || name === 'passwordConfirm') && form.password !== '' ) {
        const length = form[name].length <= 6;
        const upperCase = form[name].toUpperCase() === form[name];
        const lowerCase = form[name].toLowerCase() === form[name];
        if (upperCase ||  lowerCase || length) {
            passwordCheck = false;
        }
    }

    // verify if unique Check test is passed;
    const uniqueCheck = (
        !error[name] &&
        form[name] !== '' &&
        error[name] !== null &&
        usernameLengthCheck
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
                { ownCheck && uniqueCheck && emailValidation && passwordCheck && (<MdDone />) }
            </div>
            { !usernameLengthCheck && (
                <div className="error">{errorMessage.usernameLength}</div>

            )}
            { !emailValidation && (
                <div className="error">{errorMessage.emailValidation}</div>

            )}
            { ownCheck && usernameLengthCheck && (error[name] || (!passwordCheck && name === "password")) && (
                <div className="error">{errorMessage[name]}</div>
            )}

        </div>
    );
};

export default Input;