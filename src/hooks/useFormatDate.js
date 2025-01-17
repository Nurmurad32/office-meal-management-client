const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const weekday = date.toLocaleString('default', { weekday: 'long' });

    return `${day}-${month}-${year}, ${weekday}`;
};

export default formatDate;