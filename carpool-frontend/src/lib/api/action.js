import client from "./client";

export const getUserPartners = rideId =>
    client.get(`/api/action/ride/${rideId}/partners`)

export const getRidePartners = () =>
    client.get(`/api/action/ridePartners`); // req.user

export const addRide = (rideId, userId) =>
    client.post(`/api/action/ride/${rideId}/user/${userId}/add`);


/* passengers */
export const cancelRide = rideId =>
    client.post(`/api/action/ride/${rideId}/cancel`);

export const addRequest = rideId =>
    client.post(`/api/action/ride/${rideId}/request/add`);

export const cancelRequest = rideId =>
    client.post(`/api/action/ride/${rideId}/request/cancel`);

export const getRideStatus = () =>
    client.get('rides/status');

/* drivers */
export const addPassenger = ({ rideId, userId }) =>
    client.post(`/api/action/ride/${rideId}/user/${userId}/add`);

export const cancelPassenger = ({ rideId, userId }) =>
    client.post(`/api/action/ride/${rideId}/user/${userId}/cancel`);

export const getMyPosts = () =>
    client.get('/api/action/posts/manage');

export const getPassengers = (rideId) =>
    client.get(`/api/action/ride/${rideId}/passengers`);

export const getRequests = (rideId) =>
    client.get(`/api/action/ride/${rideId}/requests`);

