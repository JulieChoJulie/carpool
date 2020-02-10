const dateFormat = (dateTimeStr) => {
    const rideDate = new Date(dateTimeStr);
    let date;
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (rideDate.toLocaleDateString() === today.toLocaleDateString()) {
        date = 'Today';
    } else if (rideDate.toLocaleDateString() === yesterday.toLocaleDateString()) {
        date = 'Yesterday';
    } else if (rideDate.toLocaleDateString() === tomorrow.toLocaleDateString()) {
        date = 'Tomorrow';
    } else {
        date = rideDate.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short'
        })
    }
    const time = rideDate.toLocaleTimeString("en-US", {hour: '2-digit', minute: '2-digit'})
    return (date + ' at ' + time);
}

export default dateFormat;