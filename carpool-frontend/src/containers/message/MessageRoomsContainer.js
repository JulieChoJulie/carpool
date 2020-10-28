import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRooms } from '../../modules/message';
import MessageTemplate from "../../components/message/MessageTemplate";
import MessageRoomList from "../../components/message/MessageRoomList";
import { withRouter, useHistory } from 'react-router-dom';
import ErrorContainer from "../../containers/common/ErrorContainer";

const MessageRoomsContainer = ({ location }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { user, rooms, error } = useSelector(({ user, message }) => ({
        user: user.user,
        rooms: message.rooms,
        error: message.roomsError
    }));

    const onClickThumbnail = (roomId) => {
        history.push(`/message/room/${roomId}`)
    };

    useEffect(() => {
        if(rooms[0].id === null) {
            dispatch(getRooms());
        }
    }, [dispatch, rooms]);

    if (!user) {
        return (
            <MessageTemplate>
                <ErrorContainer error="0"/>
            </MessageTemplate>
        );
    } else {
        return (
            <MessageTemplate>
                <MessageRoomList
                    error={error}
                    rooms={rooms}
                    onClickThumbnail={onClickThumbnail}
                />
            </MessageTemplate>
        );
    }
};

export default withRouter(MessageRoomsContainer);
