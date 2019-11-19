import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
 Button, withSetupWizardContext, SelectList, SelectListItem, Input, PersonFinder
} from 'chayns-components';
import { connect } from 'react-redux';
import SignatureCanvas from 'react-signature-canvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { getChaynsDateString, getNowbefore18 } from '../helper';
import { getDetailUserData } from './fetch';
import { actions } from '../../reducer/reducerConstances';

class SupervisorInfo extends PureComponent {
    sigCanvasSupervisor = {};

    constructor(props) {
        super(props);
        this.state = {
            withAccount: -1,
            FirstName: '',
            LastName: '',
            Street: '',
            City: '',
            ZIP: '',
            Birthdate: '',
            MobilePhone: '',
            PersonId: ''

        };
    }

    personFinder = React.createRef();

    handleInputMethod = (id) => {
        this.setState({ withAccount: id });
    };

    inputOnChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleNewBirthDate = () => {
        chayns.dialog.date({
            dateType: chayns.dialog.dateType.DATE,
            title: '',
            message: '',
            maxDate: getNowbefore18(),
            preSelect: getNowbefore18()
        }).then((data) => {
            if (data !== -1) {
                this.setState({ Birthdate: data * 1000 });
            }
        });
    }

    handlePersonInput = (user) => {
        if (user === null) {
            return;
        }
        console.log('personInput', user);
        const { firstName, lastName, personId } = user;
        this.setState({ FirstName: firstName, LastName: lastName, PersonId: personId, withAccount: 2 });
        this.personFinder.current.clear();
    };

    handleDeleteSign = (sigpad) => {
        sigpad.clear();
    };

    handleStore = () => {
        const { store } = this.props;
        const { FirstName, LastName, City, Street, ZIP, Birthdate, MobilePhone, PersonId } = this.state;
        const obj = {};
        obj.FirstName = FirstName;
        obj.LastName = LastName;
        obj.Street = Street;
        obj.City = City;
        obj.ZIP = ZIP;
        obj.Birthdate = Birthdate;
        obj.MobilePhone = MobilePhone;
        obj.PersonId = PersonId;
        obj.Signature = this.sigCanvasSupervisor.getCanvas().toDataURL();
        store(obj);
    };


    render() {
        const { nextStep, stepComplete } = this.props;
        const {
            FirstName, LastName, Street, City, ZIP, MobilePhone, Birthdate
        } = this.state;


        const components = [
            (<div>
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
                <div className="birthdayChild">
                    <p className="birthdateDate">Geburtstdatum</p>
                    <a onClick={this.handleNewBirthDate}>{getChaynsDateString(this.state.Birthdate)}</a>
                </div>
                <Input
                    placeholder="Handynummer"
                    dynamic
                    value={MobilePhone}
                    onChange={value => this.inputOnChange('MobilePhone', value)}
                    style={{ marginBottom: '10px' }}
                    invalid={MobilePhone === ''}
                />
                <div className="deleteCanvas">
                    <Button className="deleteCanvasButton" onClick={() => this.handleDeleteSign(this.sigCanvasSupervisor)}><FontAwesomeIcon icon={faTimes} color="black" /></Button>
                    <SignatureCanvas
                        penColor="green"
                        canvasProps={{ className: 'sigCanvasSupervisor' }}
                        ref={(ref) => { this.sigCanvasSupervisor = ref; }}
                    />
                </div>
             </div>),
            (<div>
                <p className="namePtag">{`${FirstName} ${LastName}`}</p>

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
                <div className="birthdayChild">
                    <p className="birthdateDate">Geburtstdatum</p>
                    <a onClick={this.handleNewBirthDate}>{getChaynsDateString(this.state.Birthdate)}</a>
                </div>
                <Input
                    placeholder="Handynummer"
                    dynamic
                    value={MobilePhone}
                    onChange={value => this.inputOnChange('MobilePhone', value)}
                    style={{ marginBottom: '10px' }}
                    invalid={MobilePhone === ''}
                />
                <div className="deleteCanvas">
                    <Button className="deleteCanvasButton" onClick={() => this.handleDeleteSign(this.sigCanvasSupervisor)}><FontAwesomeIcon icon={faTimes} color="black" /></Button>
                    <SignatureCanvas
                        penColor="green"
                        canvasProps={{ className: 'sigCanvasSupervisor' }}
                        ref={(ref) => { this.sigCanvasSupervisor = ref; }}
                    />
                </div>
             </div>),
            (<div>
                <PersonFinder ref={this.personFinder} className="personFinder" placeholder="Finden" onChange={this.handlePersonInput}/>
            </div>)
        ];


        return (
            <div className="accordion__content">

                 <SelectList
                    onChange={this.handleInputMethod}
                    value={this.state.withAccount}
                 >
                     <div className="radioHolder">
                         <SelectListItem id={1} name="mit Chayns Konto"/>
                         {this.state.withAccount === 2 ? components[1] : null}
                         {this.state.withAccount === 1 ? components[2] : null}
                         <SelectListItem id={0} name="ohne Chayns Konto"/>
                         {this.state.withAccount === 0 ? components[0] : null}
                     </div>

                 </SelectList>




                <div className="nextButtonHolder">
                    <Button onClick={async () => {
                        await stepComplete(FirstName !== '' && LastName !== '' && Street !== '' && City !== '' && ZIP !== '' && MobilePhone !== '' && Birthdate !== '' && !this.sigCanvasSupervisor.isEmpty());
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

const mapStateToProps = ({ eventReducer }) => ({
    supervisor: eventReducer.supervisor
});

const mapDispatchToProps = dispatch => ({
    store: data => dispatch({ type: actions.ADDSUPERVISOR, data })
});

export default connect(mapStateToProps, mapDispatchToProps)(withSetupWizardContext(SupervisorInfo));
