import React from 'react';
import { useSelector } from 'react-redux';
import MessageRoom from "../../components/message/MessageRoom";
import MessageTemplate from "../../components/message/MessageTemplate";
import { withRouter } from 'react-router-dom';
import MessageRoomList from "../../components/message/MessageRoomList";
import CreateMessageRoom from "../../components/message/CreateMessageRoom";

const MessageContainer = ({ location }) => {
    const { user } = useSelector(({ user }) => ({
        user: user.user,
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
        chat: [
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
    const roomList = location.pathname === '/message';
    const room = location.pathname.includes('/room/');
    const createRoom = location.pathname.includes('create');
    let comp;
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