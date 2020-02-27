import client from './client';

export const postSave = (id) =>
    client.post(`/api/action/save/post/${id}`);

export const getSave = () =>
    client.get('/api/action/save');

export const deleteSave = (id) =>
    client.delete(`/api/action/save/post/${id}`);

export const getSaveStatus = (id) =>
    client.get(`/api/action/save/post/${id}`);