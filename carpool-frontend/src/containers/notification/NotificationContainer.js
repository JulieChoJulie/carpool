import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NotificationBlock from "../../components/notification/NotificationBlock";
import { getNoti } from '../../modules/notifications';
const NotificationContainer = () => {
    const dispatch = useDispatch();
    const { notifications, user, loading, error } = useSelector(({ notifications, user, loading }) => ({
        notifications: notifications.notifications,
        user: user.user,
        loading: loading['notifications/GET_NOTI'],
        error: notifications.error,
    }));

    useEffect(() => {
        if (user) {
            let userJson = user;
            if (typeof user === 'string') {
                userJson = JSON.parse(user);
            }
            dispatch(getNoti(userJson.id));
        }
    }, [dispatch, user]);

    return (
        <NotificationBlock error={error} notifications={notifications} loading={loading}/>
    );
};

export default NotificationContainer;