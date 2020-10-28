import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRoom } from '../../modules/message';
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
    const fakeData = [
        {
            id: 0,
            lastMessage: "hello",
            username: 'Julie2',
            createdAt: new Date(),
            MessageUsers: [
                {
                    username: "Julie3",
                },
                {
                    username: "Simon",
                },
                {
                    username: "Julie2"
                }
            ]
        },
        {
            id: 1,
            lastMessage: "Is it still available?Is it still available?Is it still available?Is it still available?Is it still available?Is it still available?Is it still available?Is it still available?Is it still available?Is it still available?Is it still available?",
            username: 'Simon',
            createdAt: new Date(),
            MessageUsers: [
                {
                    username: "Julie3",
                },
                {
                    username: "Simon",
                }
            ]
        }
    ];

    const roomData = {
        "chats": [
            {
                "id": 1,
                "chat": "Hello???",
                "gif": null,
                "createdAt": "2020-10-27T23:13:52.000Z",
                "updatedAt": "2020-10-27T23:13:52.000Z",
                "deletedAt": null,
                "roomId": 18,
                "userId": 5,
                "user": {
                    "id": 5,
                    "username": "Julie",
                    "isStudent": false
                }
            }
        ],
        "users": [
            {
                "id": 5,
                "username": "Julie",
                "isStudent": false,
                "Message": {
                    "createdAt": "2020-10-27T00:45:05.000Z",
                    "updatedAt": "2020-10-27T00:45:05.000Z",
                    "userId": 5,
                    "roomId": 18
                }
            },
            {
                "id": 6,
                "username": "Julie3",
                "isStudent": false,
                "Message": {
                    "createdAt": "2020-10-27T00:45:05.000Z",
                    "updatedAt": "2020-10-27T00:45:05.000Z",
                    "userId": 6,
                    "roomId": 18
                }
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

    let comp = null;

    if (createRoom) {
        comp = <CreateMessageRoom/>
    } else if (room) {
        comp = <MessageRoom room={roomData} user={user}/>;
    } else if (roomList) {
        comp = <MessageRoomList rooms={fakeData}/>;
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
