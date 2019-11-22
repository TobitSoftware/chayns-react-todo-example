import ReactDOM from 'react-dom';
import React from 'react';

// Constants
import { IS_DEVELOPMENT } from './constants/environment';

// Components
import App, { HotApp } from './components/App';

// Get tapp element
const tappElement = document.querySelector('.tapp');

// Render App component into tapp element
// If mode is development the component will be used from hot export of App
const render = () => {
    ReactDOM.render(
        IS_DEVELOPMENT ? <HotApp/> : <App/>,
        tappElement,
    );
};

// Call render function after chayns is ready
chayns.ready.then(render).catch((error) => {
    // eslint-disable-next-line no-console
    console.warn('No chayns environment found.', error);
});
