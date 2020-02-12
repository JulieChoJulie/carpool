import client from './client';

export const writePost = ({ rides, notes }) =>
    client.post('/api/posts', { rides, notes })

export const readPost = id =>
    client.get(`/api/posts/${id}`)

export const deletePost = id =>
    client.delete(`/api/posts/${id}`)

export const editPost = id =>
    client.put(`/api/posts/${id}`)

export const getOwner = id =>
    client.get(`/api/posts/${id}/getOwner`)
