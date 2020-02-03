import React from 'react';
import './AuthFormBlock.scss';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const text = {
    login: 'LOG IN',
    signup: 'SIGN UP'
}

const AuthForm = ({ type, onChange, onSubmit, form }) => {
    return (
        <div className="AuthFormBlock">
            <h3>{text[type]}</h3>
            <form onSubmit={onSubmit}>
                <input
                    className="Input"
                    placeholder="USERNAME"
                    name="username"
                    auto-complete="username"
                    onChange={onChange}
                    value={form.username}
                />
                <input
                    className="Input"
                    placeholder="PASSWORD"
                    type="password"
                    name="password"
                    auto-complete="new-password"
                    onChange={onChange}
                    value={form.password}
                />
                { type === 'signup' && (
                    <input
                        className="Input"
                        placeholder="CONFIRM PASSWORD"
                        name="passwordConfirm"
                        type="pasword"
                        auto-complete="new-password"
                        onChange={onChange}
                        value={form.passwordConfirm}
                    />
                )}
                <Button color="burgundy" fullWidth>{text[type]}</Button>
            </form>
            <div className="Footer">
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