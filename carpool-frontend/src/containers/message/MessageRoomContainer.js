import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRoom } from '../../modules/message';
import MessageRoom from "../../components/message/MessageRoom";
import MessageTemplate from "../../components/message/MessageTemplate";
import { withRouter, useHistory } from 'react-router-dom';
import ErrorContainer from "../../containers/common/ErrorContainer";

const MessageRoomContainer = ({ location, match }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const roomId = location.pathname.slice('/room/')
    console.log(roomId);
    const { user, room } = useSelector(({ user, message }) => ({
        user: user.user,
        room: message.room,
    }));

    useEffect(() => {
        dispatch(getRoom(match.params.roomId));
    }, [dispatch, match]);


    const roomData = {
        "chats": [
            {
                "id": 1,
                "chat": "hello",
                "gif": null,
                "createdAt": "2020-10-28T04:38:17.000Z",
                "updatedAt": "2020-10-28T04:38:17.000Z",
                "deletedAt": null,
                "roomId": 1,
                "userId": 1,
                "user": {
                    "id": 1,
                    "username": "Julie",
                    "isStudent": false
                }
            }
        ],
        "users": [
            {
                "id": 1,
                "username": "Julie",
                "isStudent": false,
                "Message": {
                    "createdAt": "2020-10-28T04:29:26.000Z",
                    "updatedAt": "2020-10-28T04:29:26.000Z",
                    "userId": 1,
                    "roomId": 1
                }
            },
            {
                "id": 2,
                "username": "Simon",
                "isStudent": false,
                "Message": {
                    "createdAt": "2020-10-28T04:29:26.000Z",
                    "updatedAt": "2020-10-28T04:29:26.000Z",
                    "userId": 2,
                    "roomId": 1
                }
            }
        ],
        "rides": [
            {
                "id": 1,
                "seats": 1,
                "available": 1,
                "from": "Amherstburg",
                "to": "Atikokan",
                "when": "2020-10-31T00:38:13.000Z",
                "status": true,
                "offering": true,
                "price": "10.00",
                "postId": 1
            },
            {
                "id": 2,
                "seats": 1,
                "available": 1,
                "from": "Atikokan",
                "to": "Aurora",
                "when": "2020-11-01T00:38:13.000Z",
                "status": true,
                "offering": true,
                "price": "10.00",
                "postId": 1
            }
        ]
    };

    const onClickUser = (username) => {
        history.push(`/user/@${username}/profile`)
    };
    const onClickBack = () => {
        history.push('/message');
    };
    const onClickDelete = () => {

    };

    let comp = null;
    if (!user) {
        comp = <ErrorContainer error="0"/>
    } else {
        comp =
            <MessageRoom
                room={roomData}
                user={user}
                onClickUser={onClickUser}
                onClickBack={onClickBack}
                onClickDelete={onClickDelete}
            />;
    }
    return (
        <MessageTemplate>
            {comp}
        </MessageTemplate>
    );
};

export default withRouter(MessageRoomContainer);
