import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, withSetupWizardContext, Input } from 'chayns-components';
import { connect } from 'react-redux';
import { actions } from '../../reducer/reducerConstances';

class ParentInfo extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            street: '',
            city: '',
            ZIP: '',
            phonenumber: '',

        };
    }

    inputOnChange = (name, value) => {
        this.setState({ [name]: value });
    };

    render() {
        const { nextStep, stepComplete, store } = this.props;
        const {
            firstName, lastName, street, city, ZIP, phonenumber
        } = this.state;

        return (

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
                <Input
                    placeholder="Handynummer"
                    dynamic
                    value={phonenumber}
                    onChange={value => this.inputOnChange('phonenumber', value)}
                    style={{ marginBottom: '10px' }}
                    invalid={phonenumber === ''}
                />
                <div className="nextButtonHolder">
                    <Button onClick={async () => {
                        await stepComplete(firstName !== '' && lastName !== '' && street !== '' && city !== '' && ZIP !== '' && phonenumber !== '');
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
    parent: eventReducer.parent
});

const mapDispatchToProps = dispatch => ({
    store: data => dispatch({ type: actions.ADDPARENT, data })
});

export default connect(mapStateToProps, mapDispatchToProps)(withSetupWizardContext(ParentInfo));
