import React from 'react';
import MessageRoomThumbnail from "./MessageRoomThumbnail";
import ErrorContainer from "../../containers/common/ErrorContainer";

const MessageRoomList = ({ rooms, error, onClickThumbnail }) => {
    let comp = null;
    if (error) {
        comp = <ErrorContainer error={500}/>
    } else if (rooms.length === 0 || rooms[0].id === null) {
        comp = <div>There is no message.</div>
    } else {
        comp = rooms.map(r =>
                <MessageRoomThumbnail
                    key={r.id}
                    room={r}
                    onClick={onClickThumbnail}
                />
            )
    }
    return (
        <div className="roomList">
            {comp}
        </div>
    );
};

export default MessageRoomList;
