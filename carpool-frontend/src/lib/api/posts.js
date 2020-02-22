import client from './client';
import qs from 'qs';

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

export const filterRides = (criteria) => {
    const query = {};
    for (const key in criteria) {
        if (criteria[key] !== '') {
            if (key === 'when') {
                const when = criteria.when;
                query.when = Number(new Date(when[0])) + '_' + Number(new Date(when[1]));
            } else if (key === 'price') {
                const price = criteria.price;
                query.price = price[0] + '_' + price[1];
            } else if (key === 'seats') {
                console.log('here');
                console.log('*********')
                query.available = criteria.seats;
            } else if (key === 'offering') {
                query.offering = criteria.offering ? 1 : 0
            } else {
                query[key] = criteria[key];
            }
        }
    }
    const queryString = qs.stringify(query);
    return client.get(`/api/posts/filter?${queryString}`);
};

/* comments */

export const writeComment = ({ postId, content }) => {
    client.post(`/api/posts/${postId}/comments`, { content });
}
export const editComment = ({ postId, commentId, content }) =>
    client.put(`/api/posts/${postId}/comments/${commentId}`, { content });

export const deleteComment = ({ postId, commentId }) =>
    client.delete(`/api/posts/${postId}/comments/${commentId}`);
