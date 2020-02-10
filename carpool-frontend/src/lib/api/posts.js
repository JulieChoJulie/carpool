import client from './client';

export const writePost = ({ rides, notes }) =>
    client.post('/api/posts', { rides, notes })

export const readPost = id =>
    client.get(`/api/posts/${id}`)

export const getPartners = rideId =>
    client.get(`/api/action/ride/${rideId}/partners`)