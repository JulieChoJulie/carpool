import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile, changeField } from '../../modules/profile';
import ProfileEditTemplate from "../../components/profile/ProfileEditTemplate";
import ProfileEdit from "../../components/profile/ProfileEdit";

const ProfileEditContainer = () => {
    const dispatch = useDispatch();
    const {
        profile,
        user
    } = useSelector(({ profile, loading, user }) => ({
        profile: profile.profile,
        user: user.user,
    }));
    const [editUsername, setEditUsername] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [editCell, setEditCell] = useState(false);

    const onChange = useCallback((key, e) => {
        dispatch(changeField({
            form: 'myProfile',
            key,
            value: e.target.value
        }));
    }, [dispatch]);

    const onClick = useCallback((key) => {
        if (key === 'password') {
            setEditPassword(true);
        } else if (key === 'email'){
            setEditEmail(true);
        } else if (key === 'username'){
            setEditUsername(true);
        } else if (key === 'cell') {
            setEditCell(true);
        }
    }, [dispatch]);

    const onSubmit = useCallback(() => {

    })

    return (
        <ProfileEditTemplate>
            <ProfileEdit
                onClick={onClick}
                onChange={onChange}
                user={user}
                editUsername={editUsername}
                editPassword={editPassword}
                editEmail={editEmail}
                editCell={editCell}
                onSubmit={onSubmit}
            />
        </ProfileEditTemplate>
    );
};

export default ProfileEditContainer;