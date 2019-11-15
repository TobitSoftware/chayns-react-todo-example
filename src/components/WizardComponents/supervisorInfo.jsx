import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
 Button, withSetupWizardContext, SelectList, SelectListItem, Input, PersonFinder
} from 'chayns-components';
import { connect } from 'react-redux';
import { getChaynsDateString, getNowbefore18 } from '../helper';
import { getDetailUserData } from './fetch';
import { actions } from '../../reducer/reducerConstances';

class SupervisorInfo extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            withAccount: -1,
            firstName: '',
            lastName: '',
            street: '',
            city: '',
            ZIP: '',
            birthdate: '',
            phonenumber: '',
            personId: ''

        };
    }

    personFinder = React.createRef();

    handleInputMethod = (id) => {
        console.log(id);
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
                this.setState({ birthdate: data * 1000 });
            }
        });
    }

    handlePersonInput = (user) => {
        if (user === null) {
            return;
        }
        console.log('personInput', user);
        const { firstName, lastName, personId } = user;
        this.setState({ firstName, lastName, personId: personId });
        this.personFinder.current.clear();
    };


    render() {
        const { nextStep, stepComplete, store } = this.props;
        const {
            firstName, lastName, street, city, ZIP, phonenumber, birthdate
        } = this.state;


        const components = [
            (<div>
                <Input
                    placeholder="Vorname"
                    dynamic
                    value={firstName}
                    onChange={value => this.inputOnChange('firstName', value)}
                    style={{ marginBottom: '10px' }}
                    invalid={firstName === ''}
                />
                <Input
                    placeholder="Nachname"
                    dynamic
                    value={lastName}
                    onChange={value => this.inputOnChange('lastName', value)}
                    style={{ marginBottom: '10px' }}
                    invalid={lastName === ''}
                />
                <Input
                    placeholder="Straße/ Nr."
                    dynamic
                    value={street}
                    onChange={value => this.inputOnChange('street', value)}
                    style={{ marginBottom: '10px' }}
                    invalid={street === ''}
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
                        value={city}
                        onChange={value => this.inputOnChange('city', value)}
                        style={{ marginBottom: '10px' }}
                        invalid={city === ''}
                    />
                </div>
                <div className="birthdayChild">
                    <p className="birthdateDate">Geburtstdatum</p>
                    <a onClick={this.handleNewBirthDate}>{getChaynsDateString(this.state.birthdate)}</a>
                </div>
                <Input
                    placeholder="Handynummer"
                    dynamic
                    value={phonenumber}
                    onChange={value => this.inputOnChange('phonenumber', value)}
                    style={{ marginBottom: '10px' }}
                    invalid={phonenumber === ''}
                />
             </div>),
            (<div>
                <PersonFinder ref={this.personFinder} className="personFinder" placeholder="finden" onChange={this.handlePersonInput}/>
                <p>{`${firstName} ${lastName}`}</p>

                <Input
                    placeholder="Straße/ Nr."
                    dynamic
                    value={street}
                    onChange={value => this.inputOnChange('street', value)}
                    style={{ marginBottom: '10px' }}
                    invalid={street === ''}
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
                        value={city}
                        onChange={value => this.inputOnChange('city', value)}
                        style={{ marginBottom: '10px' }}
                        invalid={city === ''}
                    />
                </div>
                <div className="birthdayChild">
                    <p className="birthdateDate">Geburtstdatum</p>
                    <a onClick={this.handleNewBirthDate}>{getChaynsDateString(this.state.birthdate)}</a>
                </div>
                <Input
                    placeholder="Handynummer"
                    dynamic
                    value={phonenumber}
                    onChange={value => this.inputOnChange('phonenumber', value)}
                    style={{ marginBottom: '10px' }}
                    invalid={phonenumber === ''}
                />
             </div>)
        ];


        return (
            <div className="accordion__content">

                <SelectList
                    onChange={this.handleInputMethod}
                    value={0}
                >
                    <SelectListItem id={1} name="mit Chayns-Konto"/>
                    {this.state.withAccount > 0 ? components[1] : null }
                    <SelectListItem id={0} name="ohne Chayns-Konto"/>
                    {this.state.withAccount === 0 ? components[0] : null }
                </SelectList>


                <div className="nextButtonHolder">
                    <Button onClick={async () => {
                        await stepComplete(firstName !== '' && lastName !== '' && street !== '' && city !== '' && ZIP !== '' && phonenumber !== '' && birthdate !== '');
                        store(this.state);
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
