import client from './client';

export const createRoom = ({ userId, rideId }) =>
    client.post('/api/message/room', ({ userId, rideId }));

export const getRoom = (roomId) =>
    client.get(`/api/message/room/${roomId}`);


