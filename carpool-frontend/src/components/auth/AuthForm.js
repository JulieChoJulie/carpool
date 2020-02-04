import React from 'react';
import './AuthFormBlock.scss';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const text = {
    login: 'LOG IN',
    signup: 'SIGN UP'
}

const AuthForm = ({ type, onChange, onSubmit, form, onClick }) => {
    return (
        <div className="AuthFormBlock">
            <h3>{text[type]}</h3>
            <form onSubmit={onSubmit}>
                <div className="subForm">
                    <input
                        className="input"
                        placeholder="USERNAME"
                        name="username"
                        auto-complete="username"
                        onChange={onChange}
                        value={form.username}
                    />
                    { type === 'signup' && (
                        <Button check color="burgundy" button onClick={onClick}>Check</Button>
                    )}
                </div>
                { type === 'signup' && (
                    <>
                        <div className="subForm">
                            <input
                                className="input"
                                placeholder="EMAIL"
                                name="email"
                                type="email"
                                auto-complete="email"
                                onChange={onChange}
                                value={form.email}
                            />
                            { type === 'signup' && (
                                <Button color="burgundy" check button onClick={onClick}>Check</Button>
                            )}
                        </div>
                            <input
                                className="input subForm"
                                placeholder="CELL"
                                name="cell"
                                type="tel"
                                onChange={onChange}
                                value={form.cell}
                            />
                    </>
                )}
                    <input
                        className="input subForm"
                        placeholder="PASSWORD"
                        type="password"
                        name="password"
                        auto-complete="new-password"
                        onChange={onChange}
                        value={form.password}
                    />

                <input
                    className="input subForm"
                    placeholder="CONFIRM PASSWORD"
                    name="passwordConfirm"
                    type="password"
                    auto-complete="new-password"
                    onChange={onChange}
                    value={form.passwordConfirm}
                />
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