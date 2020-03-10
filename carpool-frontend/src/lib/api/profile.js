import client from "./client";

export const getProfile = (username) =>
    client.get(`/api/user/getProfile/${username}`);