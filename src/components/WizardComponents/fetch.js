import logger from 'chayns-logger';

const reqUserDataUrl = 'https://sub31.tobit.com/API/Address/get';
const reqDSetailUserInfo = 'https://webapi.tobit.com/AccountService/v1.0/chayns/User?PersonId=';
const reqEvents = ' https://mashup.tobit.com/api/events/v0.1/';
const route = 'https://tappqa.tobit.com/PowerOfAttorney/Web.API/v1.0';

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
        return res;
    }

    return res.json();
};


export const getDetailUserData = async () => {
    const { personId } = chayns.env.user;

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

export const getAllEventsFromSite = async (max) => {
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
            ex: res.type,
            data: res
        });
        return (`err, ${res.statusText}`);
    }
    const jres = await res.json();
    if (max === undefined || max === null) {
        return jres;
    }

    const retval = [];
    for (let i = 0; i < max; i++) {
        retval.push(jres[i]);
    }

    return retval;
};

export const postPowerOfAttorney = async (boardId, form) => {
    const res = await fetch(`${route}/${boardId}/Formular`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${chayns.env.user.tobitAccessToken}`,
        },
        body: form
    });

    return res;
};

export const getBoard = async (peronId, locationId, tappId) => {
    const res = await fetch(`${route}/${peronId}/${locationId}/${tappId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${chayns.env.user.tobitAccessToken}`,
        }
    });

    if (!res.ok) {
        logger.error({
            message: res.statusText,
            ex: res.type,
            file: 'fetch',
            section: 'getBoard'
        });
    }

    return res;
};
