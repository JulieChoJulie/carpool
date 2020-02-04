import client from './client';

export const login = ({ username, password }) =>
    client.post('/api/auth/login', { username, password });

export const signup = ({ username, password, email, cell }) =>
    client.post('/api/auth/join', { username, email, password, cell })