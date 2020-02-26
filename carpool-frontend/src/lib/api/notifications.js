import client from './client';

export const readNotifications = (userId) =>
    client.get(`/api/notifications/users/${userId}`);