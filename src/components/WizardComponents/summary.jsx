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
 TXT_SUMMARY_1, TXT_SUMMARY_2, TXT_SUMMARY_3, TXT_SUMMARY_4
} from '../../constants/localstorage';
import { actions } from '../../reducer/reducerConstances';

class Summary extends PureComponent {
    sigCanvasParent = {};

    sigCanvasSupervisor = {};

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleDeleteSign = (sigpad) => {
        sigpad.clear();
    };


    handleSave = () => {
        const { parent, supervisor, store } = this.props;
        const picP = this.sigCanvasParent.getCanvas().toDataURL();
        const picS = this.sigCanvasSupervisor.getCanvas().toDataURL();

        const data = {
            parent: picP,
            supervisor: picS
        };

        store(data);
    }

    render() {
        const {
            nextStep, stepComplete, store, child, parent, supervisor, event
            } = this.props;

        return (
            <div className="accordion__content">
                <p>{TXT_SUMMARY_1}</p>

                <p className="summaryNames">{`${parent.firstName} ${parent.lastName}`}</p>

                <div className="deleteCanvas">
                    <Button
                        className="deleteCanvasButton"
                        onClick={() => this.handleDeleteSign(this.sigCanvasParent)}
                    >
                        <FontAwesomeIcon icon={faTimes} color="black" />
                    </Button>
                    <SignatureCanvas
                        penColor="green"
                        canvasProps={{ className: 'sigCanvasParent' }}
                        ref={(ref) => { this.sigCanvasParent = ref; }}
                    />
                </div>

                <p className="canvasUnderline">(Unterschrift des Erziehungsberechtigten)</p>

                <p>{TXT_SUMMARY_2}</p>

                <p className="summaryNames">{`${child.firstName} ${child.lastName}`}</p>

                <p>{`${TXT_SUMMARY_3} \"${event.name}\"`}</p>

                <p>{TXT_SUMMARY_4}</p>

                <p className="summaryNames">{`${supervisor.firstName} ${supervisor.lastName}`}</p>

                <div className="deleteCanvas">
                    <Button className="deleteCanvasButton" onClick={() => this.handleDeleteSign(this.sigCanvasSupervisor)}><FontAwesomeIcon icon={faTimes} color="black" /></Button>
                    <SignatureCanvas
                        penColor="green"
                        canvasProps={{ className: 'sigCanvasSupervisor' }}
                        ref={(ref) => { this.sigCanvasSupervisor = ref; }}
                    />
                </div>

                <p className="canvasUnderline">(Unterschrift der Aufsichtsperson)</p>

                <Accordion
                head="Belehrung"
                />
                <Checkbox className="summaryCheckbox" label="Ich habe die Belehrung verstanden."/>
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
    store: data => dispatch({ type: actions.ADDCONFIRM, data })
});


export default connect(mapStateToProps, mapDispatchToProps)(withSetupWizardContext(Summary));
