import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, withSetupWizardContext, Input } from 'chayns-components';
import { connect } from 'react-redux';
import { getUserData, getDetailUserData } from './fetch';
import { getChaynsDateString } from '../helper';
import { actions } from '../../reducer/reducerConstances';


class ChildInfo extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            firstName: chayns.env.user.firstName,
            lastName: chayns.env.user.lastName,
            street: '',
            city: '',
            ZIP: '',
            birthdate: ''
        };
    }

    componentDidMount() {
        this.handleGetUserData();
        console.log(this.props.child);
    }

    handleGetUserData = async () => {
        const res = await getUserData();
        const res1 = res[0];
        const street = res1.Street;
        const city = res1.City.Name;
        const ZIP = res1.City.ZipCode;

        const resDetail = await getDetailUserData();
        const birthdateUTC = resDetail.birthDay;
        const birthdate = getChaynsDateString(birthdateUTC);

        this.setState({
            street,
            city,
            ZIP,
            birthdate
        });
    };

    storeChild = () => {
        this.props.store(this.state);
    };

    inputOnChange = (name, value) => {
        this.setState({ [name]: value });
    };


    render() {
        const {
            nextStep, stepComplete, store
        } = this.props;
        const {
            firstName, lastName, street, city, ZIP, birthdate
        } = this.state;
        return (
            <div>
                <div className="accordion__content">
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
                        placeholder="Straße/ Hausnummer"
                        dynamic
                        value={street}
                        onChange={value => this.inputOnChange('street', value)}
                        style={{ marginBottom: '10px' }}
                        invalid={street === ''}
                    />
                    <div className="zipCityDiv">
                        <div className="ZIP">
                            <Input
                                placeholder="PLZ"
                                dynamic
                                value={ZIP}
                                onChange={value => this.inputOnChange('ZIP', value)}
                                style={{ marginBottom: '10px' }}
                                invalid={ZIP === ''}
                            />
                        </div>
                        <div className="city">
                            <Input
                                placeholder="Wohnort"
                                dynamic
                                value={city}
                                onChange={value => this.inputOnChange('city', value)}
                                style={{ marginBottom: '10px' }}
                                invalid={city === ''}
                            />
                        </div>
                    </div>


                    <div className="birthdayChild">

                        <p>Geburtsdatum</p>
                        {/* Put <a> here to edit with Calendar */}
                        <p>{birthdate}</p>
                    </div>

                    <div className="nextButtonHolder">
                        <Button onClick={async () => {
                            await stepComplete(firstName !== '' && lastName !== '' && street !== '' && city !== '' && ZIP !== '' && birthdate !== '');
                            this.storeChild();
                            nextStep();
                        }}
                        >


                            Weiter
                        </Button>
                    </div>


                </div>


            </div>
        );
    }
}

ChildInfo.propTypes = {

    nextStep: PropTypes.func.isRequired,
    stepComplete: PropTypes.func.isRequired,
    store: PropTypes.func.isRequired

};

const mapStateToProps = eventReducer => ({
    child: eventReducer.child
});

const mapDispatchToProps = dispatch => ({
    store: (data) => {
        dispatch({
            type: actions.ADDCHILD,
            data
        });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withSetupWizardContext(ChildInfo));
