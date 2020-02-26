import React from 'react';
import Notification from '../common/Notification';
import './NotificationBlock.scss';
import ErrorContainer from "../../containers/common/ErrorContainer";

const NotificationBlock = ({ error, notifications, loading}) => {
    if (error) {
        return <ErrorContainer error={error}/>;
    }
    if (!notifications || loading) {
        return null;
    }
    return (
        <div className="notificationTemplate">
            {notifications.map((n, index)=>
                <Notification key={index} notification={n}/>
            )}
        </div>
    );
};

export default NotificationBlock;