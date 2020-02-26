import React from 'react';
import OutsideAlerter from './OnClickOutside';
import Notification from './Notification';
import classNames from 'classnames';
import './NotificationBlock.scss';
import { Link } from 'react-router-dom';

const NotificationBlock = ({ notifications, isClosed, onClickOutside, username }) => {
    return (
        <div className={classNames("notificationTemplate", { isClosed })}>
            <OutsideAlerter isClosed={isClosed} onClickOutside={onClickOutside}>
            <div className="notificationBlock">
                {notifications.length === 0 &&
                    <div className="notification">
                        There is no notifications..
                    </div>
                }
                {notifications.map((notification, index) =>
                    <Notification key={index} notification={notification}/>
                )}
                <Link to={`/@${username}/notifications`}>See more notifications..</Link>
            </div>
            </OutsideAlerter>
        </div>
    );
};

export default NotificationBlock;