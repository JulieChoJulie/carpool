import client from './client';

export const writePost = ({ rides }) =>
    client.post('/api/posts/', { rides })