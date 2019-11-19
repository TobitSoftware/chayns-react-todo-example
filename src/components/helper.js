const weekdays = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];


export const getChaynsDateString = (UTCdate) => {
    if (UTCdate === undefined || UTCdate === null || UTCdate === '') {
        return 'Wählen';
    }
    const date = new Date(UTCdate);

    const day = `${date.getDate()}.`;
    const month = `${months[date.getMonth()]}`;
    const year = date.getFullYear();

    return (`${day} ${month} ${year}`);
};

export const getSimpleDate = (UTCdate) => {
    if (UTCdate === undefined || UTCdate === null || UTCdate === '') {
        return 'Wählen';
    }
    const date = new Date(UTCdate);
    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth()}`.slice(-2);


    return `${day}. ${month}`;
};

export const getNowbefore18 = () => {
    const now = new Date();
    const year = now.getFullYear();
    const res = new Date(year - 18, now.getMonth(), now.getDate());
    return res;
};
