import React from 'react';
import MessageRoomThumbnail from "./MessageRoomThumbnail";

const MessageRoomList = ({ rooms, onClickThumbnail }) => {
    return (
        <div className="roomList">
            {rooms.map(r =>
                <MessageRoomThumbnail
                    key={r.id}
                    room={r}
                    onClick={onClickThumbnail}
                />
            )}
        </div>
    );
};

export default MessageRoomList;
