import React from 'react';
import ReservationsTemplate from "../../components/categorize/ReservationsTemplate";
import Post from "../../components/postList/Post";
import ActiveMenu from "../../components/common/ActiveMenu";
import ErrorContainer from "../../containers/common/ErrorContainer";



const Reservations = ({
    onToggleSave,
    filterActive,
    postsError,
    user,
    posts,
    loading,
    onToggleActive,
    isActive,
    history,
    status

}) => {
    const postFilter = (array) => {
        return array.map((post, index) =>
            <Post
                user={user}
                key={'requests' + index}
                post={post}
                status={status}
                onToggleSave={onToggleSave}
                filterActive={filterActive}
            />
        )
    }

    let arr = posts;
    if (isActive) {
        arr = posts;
    } else {
        arr = history;
    }

    if (postsError) {
        return (
            <ReservationsTemplate user={user}>
                <ErrorContainer error={postsError}/>
            </ReservationsTemplate>
        )
    } else if (!arr || loading) {
        return null;
    } else {
        const requests = Array.isArray(arr[1]) && arr[1].length > 0 && arr[1];
        const confirmed = Array.isArray(arr[0]) && arr[0].length > 0 && arr[0];
        return (
            <>
                <ReservationsTemplate
                    user={user}
                >
                    <ActiveMenu onToggle={onToggleActive} isActive={isActive}/>
                    <h2>Reservations</h2>
                    {confirmed ? postFilter(confirmed)
                        :
                        <div>No Reservations</div>
                    }
                    <h2>Reqeusts</h2>
                    {requests ? postFilter(requests)
                        :
                        <div>No Requests</div>
                    }
                </ReservationsTemplate>
            </>
        )
    }
};

export default Reservations;