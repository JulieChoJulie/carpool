import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRoom, getRooms } from '../../modules/message';
import MessageRoom from "../../components/message/MessageRoom";
import MessageTemplate from "../../components/message/MessageTemplate";
import MessageRoomList from "../../components/message/MessageRoomList";
import CreateMessageRoom from "../../components/message/CreateMessageRoom";
import { withRouter, useHistory } from 'react-router-dom';
import ErrorContainer from "../../containers/common/ErrorContainer";

const MessageContainer = ({ location }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { user, messages } = useSelector(({ user, message }) => ({
        user: user.user,
        messages: message.messages,
    }));
    const fakeData =
        [
            {
                "id": 1,
                "createdAt": "2020-10-28T04:29:26.000Z",
                "updatedAt": "2020-10-28T04:29:26.000Z",
                "deletedAt": null,
                "postId": 1,
                "post": {
                    "id": 1,
                    "status": true,
                    "notes": "",
                    "createdAt": "2020-10-28T04:26:33.000Z",
                    "updatedAt": "2020-10-28T04:26:33.000Z",
                    "deletedAt": null,
                    "userId": 1,
                    "rides": [
                        {
                            "from": "Amherstburg",
                            "to": "Atikokan",
                            "when": "2020-10-31T00:38:13.000Z"
                        },
                        {
                            "from": "Atikokan",
                            "to": "Aurora",
                            "when": "2020-11-01T00:38:13.000Z"
                        }
                    ]
                },
                "Message": {
                    "createdAt": "2020-10-28T04:29:26.000Z",
                    "updatedAt": "2020-10-28T04:29:26.000Z",
                    "userId": 1,
                    "roomId": 1
                },
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
                ]
            }
        ];

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

    useEffect(() => {
        roomData.users = messages.users;
    }, [messages, roomData]);

    const roomList = location.pathname === '/message';
    const room = location.pathname.includes('/room/');
    const createRoom = location.pathname.includes('create');

    useEffect(() => {
        if (room) {
            const arr = location.pathname.split('/room/');
            const roomId = arr[arr.length -1];
            dispatch(getRoom(roomId));
        }
    }, [location, dispatch, room]);

    const onClickUser = (username) => {
        history.push(`/user/@${username}/profile`)
    };
    const onClickBack = () => {
        history.push('/message');
    };
    const onClickDelete = () => {

    };
    const onClickThumbnail = (roomId) => {
        history.push(`/message/room/${roomId}`)
    };

    let comp = null;

    if (createRoom) {
        comp = <CreateMessageRoom/>
    } else if (room) {
        comp =
            <MessageRoom
                room={roomData}
                user={user}
                onClickUser={onClickUser}
                onClickBack={onClickBack}
                onClickDelete={onClickDelete}
            />;
    } else if (roomList) {
        comp =
            <MessageRoomList
                rooms={fakeData}
                onClickThumbnail={onClickThumbnail}
            />;
    }

    if (!user) {
        return <ErrorContainer error="0"/>
    } else {
        return (
            <MessageTemplate>
                {comp}
            </MessageTemplate>
        );
    }
};

export default withRouter(MessageContainer);
