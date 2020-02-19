import client from './client';

export const writePost = ({ rides, notes }) =>
    client.post('/api/posts', { rides, notes });

export const readFeed = () =>
    client.get('/api/posts');

export const readPost = id =>
    client.get(`/api/posts/${id}`);

export const deletePost = id =>
    client.delete(`/api/posts/${id}`);

export const editPost = id =>
    client.put(`/api/posts/${id}`);

export const getOwner = id =>
    client.get(`/api/posts/${id}/getOwner`);

export const deleteRide = (postId, rideId) =>
    client.delete(`/api/posts/${postId}/ride/${rideId}`);


/* comments */

export const writeComment = ({ postId, content }) => {
     console.log('here')
    client.post(`/api/posts/${postId}/comments`, { content });
}
export const editComment = ({ postId, commentId, content }) =>
    client.put(`/api/posts/${postId}/comments/${commentId}`, { content });

export const deleteComment = ({ postId, commentId }) =>
    client.delete(`/api/posts/${postId}/comments/${commentId}`);
