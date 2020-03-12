import React from 'react';
import MessageRoomThumbnail from "./MessageRoomThumbnail";

const MessageRoomList = ({ rooms }) => {
    return (
        <div className="roomList">
            {rooms.map(r =>
                <MessageRoomThumbnail
                    key={r.id}
                    room={r}
                />
            )}
        </div>
    );
};

export default MessageRoomList;