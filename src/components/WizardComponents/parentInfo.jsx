import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, withSetupWizardContext, Input } from 'chayns-components';
import { connect } from 'react-redux';
import SignatureCanvas from 'react-signature-canvas';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { actions } from '../../reducer/reducerConstances';


class ParentInfo extends PureComponent {
    sigCanvasParent = {};

    constructor(props) {
        super(props);
        this.state = {
            FirstName: '',
            LastName: '',
            Street: '',
            City: '',
            ZIP: '',
            MobilePhone: '',
            firstStored: false,
            Signature: ''
        };
    }


    inputOnChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleDeleteSign = (sigpad) => {
        sigpad.clear();
    };

    handleStore = () => {
        if (this.sigCanvasParent.isEmpty()) {
            return;
        }


        const { store } = this.props;

        const obj = {};
        const {
            FirstName, LastName, Street, City, ZIP, MobilePhone
            } = this.state;
        obj.FirstName = FirstName;
        obj.LastName = LastName;
        obj.Street = Street;
        obj.City = City;
        obj.ZIP = ZIP;
        obj.MobilePhone = MobilePhone;
        // Check wether the sign is set...
        obj.Signature = this.sigCanvasParent.getCanvas().toDataURL();

        // this.setState({ firstStored: true });
        store(obj);
    };

    render() {
        const { nextStep, stepComplete } = this.props;
        const {
            FirstName, LastName, Street, City, ZIP, MobilePhone
        } = this.state;


        const sigPadComponent = (
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
        );

        return (

            <div className="accordion__content">
                <Input
                    placeholder="Vorname"
                    dynamic
                    value={FirstName}
                    onChange={value => this.inputOnChange('FirstName', value)}
                    style={{ marginBottom: '10px' }}
                    invalid={FirstName === ''}
                />
                <Input
                    placeholder="Nachname"
                    dynamic
                    value={LastName}
                    onChange={value => this.inputOnChange('LastName', value)}
                    style={{ marginBottom: '10px' }}
                    invalid={LastName === ''}
                />
                <Input
                    placeholder="Straße/ Nr."
                    dynamic
                    value={Street}
                    onChange={value => this.inputOnChange('Street', value)}
                    style={{ marginBottom: '10px' }}
                    invalid={Street === ''}
                />
                <div className="zipCityDiv">
                    <Input
                        className="ZIP"
                        placeholder="PLZ"
                        dynamic
                        value={ZIP}
                        onChange={value => this.inputOnChange('ZIP', value)}
                        style={{ marginBottom: '10px' }}
                        invalid={ZIP === ''}
                    />
                    <Input
                        className="city"
                        placeholder="Wohnort"
                        dynamic
                        value={City}
                        onChange={value => this.inputOnChange('City', value)}
                        style={{ marginBottom: '10px' }}
                        invalid={City === ''}
                    />
                </div>
                <Input
                    placeholder="Handynummer"
                    dynamic
                    value={MobilePhone}
                    onChange={value => this.inputOnChange('MobilePhone', value)}
                    style={{ marginBottom: '10px' }}
                    invalid={MobilePhone === ''}
                />
                {sigPadComponent}
                <div className="nextButtonHolder">
                    <Button onClick={async () => {
                        await stepComplete(FirstName !== '' && LastName !== '' && Street !== '' && City !== '' && ZIP !== '' && MobilePhone !== '');
                        this.handleStore();
                        nextStep();
                    }}
                    >


                        Weiter
                    </Button>
                </div>
            </div>
        );
    }
}
ParentInfo.propTypes = {
    nextStep: PropTypes.func.isRequired,
    stepComplete: PropTypes.func.isRequired,
    parent: PropTypes.object.isRequired
};

const mapStateToProps = ({ eventReducer }) => ({
    parent: eventReducer.parent
});

const mapDispatchToProps = dispatch => ({
    store: data => dispatch({ type: actions.ADDPARENT, data }),
    rempoveSign: () => dispatch({ type: actions.REMOVEPARENTSIGN })
});

export default connect(mapStateToProps, mapDispatchToProps)(withSetupWizardContext(ParentInfo));
