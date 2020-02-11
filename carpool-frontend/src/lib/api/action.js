import client from "./client";

export const getUserPartners = rideId =>
    client.get(`/api/action/ride/${rideId}/partners`)

export const getRidePartners = () =>
    client.get(`/api/action/ridePartners`); // req.user

export const addRide = rideId =>
    client.post(`/api/action/ride/${rideId}/add`);

export const cancelRide = rideId =>
    client.post(`/api/action/ride/${rideId}/cancel`);