import client from './client';

export const writePost = ({ rides, notes }) =>
    client.post('/api/posts', { rides, notes })