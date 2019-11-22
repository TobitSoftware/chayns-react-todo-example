import { hot } from 'react-hot-loader/root';
import React, { PureComponent } from 'react';

// Components
import Headline from './header/headline/Headline';
import Intro from './header/intro/Intro';
import Todos from './todos/Todos';

// We use PureComponent instead of Component because it handles the shouldComponentUpdate method for us.
// If we want to define our own shouldComponentUpdate logic we have to use Component instead of PureComponent.
class App extends PureComponent {
    render() {
        return (
            <>
                <Headline headline="chayns® React Todo Example"/>
                <Intro intro="This is a very simple and basic example of how u can use chayns® and React together."/>
                <Todos/>
            </>
        );
    }
}

export default App;
export const HotApp = hot(App);
