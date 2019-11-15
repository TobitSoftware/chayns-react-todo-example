import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
 Button, withSetupWizardContext, SelectList, SelectListItem
} from 'chayns-components';
import { connect } from 'react-redux';
import { getAllEventsFromSite } from './fetch';
import { getSimpleDate } from '../helper';
import { actions } from '../../reducer/reducerConstances';


class Events extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            myEvents: []
        };
    }

    componentDidMount() {
        this.handleLoadEvents();
    }

    handleLoadEvents = async () => {
        const myEvents = [];
        const events = await getAllEventsFromSite();
        events.map((i) => {
            myEvents.push({
                id: i.id,
                name: i.name,
                startTimestamp: getSimpleDate(i.startTimestamp)
            });
        });

        this.setState({ myEvents });
    }

    handleItemChange = async (id) => {
        const {
            nextStep, stepComplete, store
        } = this.props;


        const item = this.state.myEvents.find(i => i.id === id);

        store(item);
        await stepComplete(true);
        nextStep();
    };

    render() {
        return (
            <div className="accordion__content">
                <SelectList
                    value={-1}
                    onChange={this.handleItemChange}
                >
                    {
                        this.state.myEvents.map(i => (
                           <SelectListItem id={i.id} name={(`${i.startTimestamp} | ${i.name}`)}/>
                            ))
                    }
                </SelectList>
            </div>
        );
    }
}


const mapStateToProps = ({ eventReducer }) => ({
    event: eventReducer.event
});

const mapDispatchToProps = dispatch => ({
    store: data => dispatch({ type: actions.ADDEVENT, data })
});

export default connect(mapStateToProps, mapDispatchToProps)(withSetupWizardContext(Events));
