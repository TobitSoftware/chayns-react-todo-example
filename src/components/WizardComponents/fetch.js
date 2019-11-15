import logger from 'chayns-logger';

const reqUserDataUrl = 'https://sub31.tobit.com/API/Address/get';
const reqDSetailUserInfo = 'https://webapi.tobit.com/AccountService/v1.0/chayns/User?PersonId=';
const reqEvents = ' https://mashup.tobit.com/api/events/v0.1/';

export const getUserData = async () => {
    const res = await fetch(reqUserDataUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${chayns.env.user.tobitAccessToken}`,
        }
    });
    if (!res.ok) {
        logger.error({
            message: res.statusText,
            ex: res.type
        });
        return (`err, ${res.statusText}`);
    }

    return res.json();
};


export const getDetailUserData = async () => {
    let { personId } = chayns.env.user;

    const res = await fetch(`${reqDSetailUserInfo}${personId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${chayns.env.user.tobitAccessToken}`,
        }
    });
    if (!res.ok) {
        logger.error({
            message: res.statusText,
            ex: res.type
        });
        return (`err, ${res.statusText}`);
    }

    return res.json();
};

export const getAllEventsFromSite = async () => {
    const NEXTSiteId = '67758-26820';

    const res = await fetch(`${reqEvents}${NEXTSiteId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${chayns.env.user.tobitAccessToken}`,
        }
    });
    if (!res.ok) {
        logger.error({
            message: res.statusText,
            ex: res.type
        });
        return (`err, ${res.statusText}`);
    }

    return res.json();
};
