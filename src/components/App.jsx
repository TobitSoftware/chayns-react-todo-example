import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import { Button, SetupWizard, SetupWizardItem } from 'chayns-components';
import logger from 'chayns-logger';
import './styles.scss';
import ChildInfo from './WizardComponents/childInfo';
import Events from './WizardComponents/events';
import ParentInfo from './WizardComponents/parentInfo';
import SupervisorInfo from './WizardComponents/supervisorInfo';
import Summary from './WizardComponents/summary';


const HEADLINE = 'Erziehungsbeauftragung';
const SUBLINE = 'Jugendschutzgesetz § 1 und 2';
const TITLE1 = 'Minderjährige/r';
const TITLE2 = 'Event';
const TITLE3 = 'Erziehungsberechtigte/r';
const TITLE4 = 'Aufsichtsberechtigte/r';
const TITLE5 = 'Zusammenfassung';

// We use PureComponent instead of Component because it handles the shouldComponentUpdate method for us.
// If we want to define our own shouldComponentUpdate logic we have to use Component instead of PureComponent.
class App extends PureComponent {
    constructor() {
        super();

        this.state = {
            ready: false,
            event: {},
            child: {},
            parent: {},
            supervisor: {}
        };
    }



    handleWizardReady = () => {
        this.setState({ ready: true });
    }

    handleWizardNotComplete = () => {

    }

    render() {
        return (
            <div className="tapp">
                <h1>{HEADLINE}</h1>
                <p>{SUBLINE}</p>
                <div className="AppHolder">
                    <SetupWizard
                        numberOfSteps={5}
                        ready={this.handleWizardReady()}
                        notComplete={this.handleWizardNotComplete}
                    >
                        <SetupWizardItem title={TITLE1} step={0} required>
                            <ChildInfo />
                        </SetupWizardItem>
                        <SetupWizardItem title={TITLE2} step={1} required>
                            <Events />
                        </SetupWizardItem>
                        <SetupWizardItem title={TITLE3} step={2} required>
                            <ParentInfo />
                        </SetupWizardItem>
                        <SetupWizardItem title={TITLE4} step={3} required>
                            <SupervisorInfo />
                        </SetupWizardItem>
                        <SetupWizardItem title={TITLE5} step={4} required>
                            <Summary/>
                        </SetupWizardItem>

                    </SetupWizard>

                </div>
            </div>
        );
    }
}

export default hot(module)(App);
