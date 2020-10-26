import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRoom } from '../../modules/message';
import MessageRoom from "../../components/message/MessageRoom";
import MessageTemplate from "../../components/message/MessageTemplate";
import MessageRoomList from "../../components/message/MessageRoomList";
import CreateMessageRoom from "../../components/message/CreateMessageRoom";
import { withRouter } from 'react-router-dom';


const MessageContainer = ({ location }) => {
    const dispatch = useDispatch();
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
    ]

    const roomData = {
        chats: [
            {
                user: {
                    username: 'Simon',
                    isStudent: true,
                },
                chat: 'Hello',
                updatedAt: new Date()
            },
            {
                user: {
                    username: 'Julie2',
                },
                chat: 'Hello!!! Nice to meet you',
                updatedAt: new Date()
            },
            {
                user: {
                    username: 'Julie',
                },
                chat: 'Hey guys! How are you',
                updatedAt: new Date()
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
    }, [location, dispatch, room])

    let comp = null;

    if (createRoom) {
        comp = <CreateMessageRoom/>
    } else if (room) {
        comp = <MessageRoom user={user} room={roomData}/>;
    } else if (roomList) {
        comp = <MessageRoomList rooms={fakeData}/>;
    }

    return (
        <MessageTemplate>
            {comp}
        </MessageTemplate>
    );
};

export default withRouter(MessageContainer);
