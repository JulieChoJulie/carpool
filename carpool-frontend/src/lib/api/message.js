import client from './client';

export const createRoom = () =>
    client.post('/api/message/room');

