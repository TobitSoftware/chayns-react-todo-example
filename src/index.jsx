import React from 'react';
import ReactDOM from 'react-dom';
import immutable from 'immutable';
import logger from 'chayns-logger';
import warningMessages from './constants/warningMessages';
// import { TextString } from 'chayns-components';
import App from './components/App';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { logger as rLogger } from 'redux-logger';
import rootReducer from './reducer/rootReducer';


const storeMiddleware = [thunk];
if (__DEV__ || __STAGING__) {
    const installDevTools = require('immutable-devtools');
    installDevTools(immutable);
    storeMiddleware.push(rLogger);
}
const store = createStore(
    rootReducer,
    applyMiddleware(...storeMiddleware)
);

// Get root element
const rootEl = document.getElementById('app');

// Render given component into root element
const render = (Component) => {
    ReactDOM.render(
        <Provider store={store}>
        <Component/>
        </Provider>,
        rootEl
    );
};

/**
 * The init function is used to be sure, that chayns® will be ready until render() is called
 * @return {Promise.<void>}
 */
async function init() {
    try {
        // Wait until chayns® is ready
        await chayns.ready;

        logger.init({
            applicationUid: 'bcc5c458-7a52-43d3-99bb-e6525456d0e4',
            useDevServer: !__LIVE__,
            overrideOnError: true,
            defaults: {
                userId: chayns.env.user.id,
                personId: chayns.env.user.personId,
                firstName: chayns.env.user.firstName,
                lastName: chayns.env.user.lastName,
                siteId: chayns.env.site.id,
                locationId: chayns.env.site.locationId,
                tappId: chayns.env.site.tapp.id,
                // eslint-disable-next-line no-nested-ternary
                device: chayns.env.isIOS ? 'IOS' : chayns.env.isAndroid ? 'Android' : 'other'
            },
            middleware: (payload) => {
                if (payload.level === logger.levels.ERROR) {
                    const stringData = JSON.stringify(payload);
                    if (warningMessages.find(message => stringData.includes(message))) {
                        // eslint-disable-next-line no-param-reassign
                        payload.level = logger.levels.WARNING;
                    }
                }

                return true;
            }
        });
        // Render App

        //TextString.loadLibrary(TEXTSTRINGLIBRARY).then(() => {
            render(App);
        //});
    } catch (err) {
        console.warn('no chayns environment found', err);
    }
}

init();
