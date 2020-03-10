import client from './client';

export const login = ({ username, password }) =>
    client.post('/api/auth/login', { username, password });

export const signup = ({ username, password, email, cell, isStudentEmail }) =>
    client.post('/api/auth/join', { username, email, password, cell, isStudentEmail });

export const uniqueCheck = ({ type, value }) =>
    client.post('/api/auth/join/uniqueCheck', { type, value });

export const profile = () =>
    client.get('/api/auth/profile');

export const logout = () =>
    client.post('/api/auth/logout');

export const facebookLogin = () =>
    client.get('/auth/facebook');

export const verifyStudentEmail = (email) =>
    client.post('/api/auth/verifyStudentEmail', { email });

export const sendVerificationCodes = () =>
    client.get('/api/auth/sendVerificationCodes');

export const compareVerificationCodes = (verificationCodes) =>
    client.post('/api/auth/compareVerificationCodes', { verificationCodes });
