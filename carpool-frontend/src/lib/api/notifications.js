import client from './client';

export const readNotifications = (userId) =>
    client.get(`/api/notifications/users/${userId}`);

export const getNotificationsLogin = () =>
    client.get('/api/notifications/offline');