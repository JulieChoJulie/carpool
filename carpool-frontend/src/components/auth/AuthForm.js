import React from 'react';
import './AuthFormBlock.scss';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import Input from './Input';


const text = {
    login: 'LOG IN',
    signup: 'SIGN UP'
};

const AuthForm = ({ type, onChange, onSubmit, form, error, onBlur }) => {
    return (
        <div className="AuthFormBlock">
            <h3>{text[type]}</h3>
            <form onSubmit={onSubmit}>
                <Input
                    onBlur={onBlur}
                    name="username"
                    type={type}
                    onChange={onChange}
                    form={form}
                    error={error}
                />

                { type === 'signup' && (
                    <>
                        <Input
                            onChange={onChange}
                            onBlur={onBlur}
                            type={type}
                            name="email"
                            error={error}
                            form={form}
                        />
                        <Input
                            onChange={onChange}
                            type={type}
                            name="cell"
                            error={error}
                            form={form}
                        />
                    </>
                )}
                <Input
                    onChange={onChange}
                    type={type}
                    name="password"
                    error={error}
                    form={form}
                />
                { type === 'signup' && (
                    <Input
                        onChange={onChange}
                        type={type}
                        name="passwordConfirm"
                        error={error}
                        form={form}
                        onBlur={onBlur}
                    />
                )}
                <Button color="burgundy" fullWidth>{text[type]}</Button>
            </form>
            <div className="footer">
                {type === 'login' ? (
                    <Link to="/signup">{text.signup}</Link>
                ) : (
                    <Link to="/login">{text.login}</Link>
                )}

            </div>
        </div>
    );
};

export default AuthForm;