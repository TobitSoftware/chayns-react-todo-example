import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
 Button, Accordion, Checkbox, withSetupWizardContext
} from 'chayns-components';
import SignatureCanvas from 'react-signature-canvas';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import {
 TXT_SUMMARY_1, TXT_SUMMARY_2, TXT_SUMMARY_3, TXT_SUMMARY_4, textStrings
} from '../../constants/localstorage';
import { actions } from '../../reducer/reducerConstances';
import { postPowerOfAttorney } from './fetch';


class Summary extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }


    handleSave = async () => {
        const {
 child, event, parent, supervisor, confirm
} = this.props;
        const obj = {
            child, parent, supervisor, BoardId: 1, EventId: event.id, EventName: event.name
        };
        const res = await postPowerOfAttorney(1, obj);
        console.log(res);
        if (res.ok) {
            confirm();
        }
    };

    render() {
        const {
            nextStep, stepComplete, store, child, parent, supervisor, event
            } = this.props;


        return (
            <div className="accordion__content">


                <p className="summaryNames">{`${parent.FirstName} ${parent.LastName}`}</p>


                <p>{TXT_SUMMARY_2}</p>

                <p className="summaryNames">{`${child.FirstName} ${child.LastName}`}</p>

                <p>{`${TXT_SUMMARY_3} \"${event.name}\"`}</p>

                <p>{TXT_SUMMARY_4}</p>

                <p className="summaryNames">{`${supervisor.FirstName} ${supervisor.LastName}`}</p>

                <Accordion
                head="Belehrung"
                >
                    <p>{textStrings.summaryInstruction1}</p>
                    <p>{textStrings.summaryInstruction2}</p>
                    <p>{textStrings.summaryInstruction3}</p>
                    <p>{textStrings.summaryInstruction4}</p>
                    <p>{textStrings.summaryInstruction5}</p>
                </Accordion>
                <Checkbox className="summaryCheckbox" label="Ich habe die Belehrung verstanden."/>

                <div className="imgHolder">
                    <img className="signP" src={parent.Signature}/>
                    <img className="signS" src={supervisor.Signature}/>
                </div>


                <div className="nextButtonHolder">
                    <Button onClick={this.handleSave}>Erstellen</Button>
                </div>

                <div className="ankerHolder">
                    <a className="verwerfenAnker">Verwerfen</a>
                </div>

            </div>
        );
    }
}

Summary.propTypes = {
    parent: PropTypes.object.isRequired,
    supervisor: PropTypes.object.isRequired,
    child: PropTypes.object.isRequired,
    event: PropTypes.object.isRequired
};

const mapStateToProps = ({ eventReducer }) => ({
    event: eventReducer.event,
    child: eventReducer.child,
    parent: eventReducer.parent,
    supervisor: eventReducer.supervisor
});

const mapDispatchToProps = dispatch => ({
    confirm: dispatch({ type: actions.ADDCONFIRM })
});


export default connect(mapStateToProps, mapDispatchToProps)(withSetupWizardContext(Summary));
