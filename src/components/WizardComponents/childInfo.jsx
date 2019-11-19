import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, withSetupWizardContext, Input } from 'chayns-components';
import { connect } from 'react-redux';
import { getUserData, getDetailUserData, getBoard } from './fetch';
import { getChaynsDateString } from '../helper';
import { actions } from '../../reducer/reducerConstances';


class ChildInfo extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            FirstName: chayns.env.user.firstName,
            LastName: chayns.env.user.lastName,
            personId: chayns.env.user.personId,
            Street: '',
            City: '',
            ZIP: '',
            Birthdate: ''
        };
    }

    componentDidMount() {
        this.handleGetUserData();
        this.handleGetBoard();
    }

    handleGetBoard = async () => {
        const { setBoard } = this.props;
        const { personId } = chayns.env.user;
        const { locationId, tapp } = chayns.env.site;

        console.log(personId, tapp.id, locationId);
        const res = await getBoard(personId, locationId, tapp.id);
        if (res.ok) {
            const j = await res.json();
            setBoard(j.boardId);
            return true;
        }
        return false;
    }

    handleGetUserData = async () => {
        const res = await getUserData();
        const res1 = res[0];
        const { Street } = res1;
        const City = res1.City.Name;
        const ZIP = res1.City.ZipCode;

        const resDetail = await getDetailUserData();
        const birthdateUTC = resDetail.birthDay;
        const Birthdate = getChaynsDateString(birthdateUTC);

        this.setState({
            Street,
            City,
            ZIP,
            Birthdate
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
            FirstName, LastName, Street, City, ZIP, Birthdate
        } = this.state;
        return (
            <div>
                <div className="accordion__content">
                    <Input
                        placeholder="Vorname"
                        dynamic
                        value={FirstName}
                        onChange={value => this.inputOnChange('firstName', value)}
                        style={{ marginBottom: '10px' }}
                        invalid={FirstName === ''}
                    />
                    <Input
                        placeholder="Nachname"
                        dynamic
                        value={LastName}
                        onChange={value => this.inputOnChange('lastName', value)}
                        style={{ marginBottom: '10px' }}
                        invalid={LastName === ''}
                    />
                    <Input
                        placeholder="Straße/ Hausnummer"
                        dynamic
                        value={Street}
                        onChange={value => this.inputOnChange('Street', value)}
                        style={{ marginBottom: '10px' }}
                        invalid={Street === ''}
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
                                value={City}
                                onChange={value => this.inputOnChange('City', value)}
                                style={{ marginBottom: '10px' }}
                                invalid={City === ''}
                            />
                        </div>
                    </div>


                    <div className="birthdayChild">

                        <p>Geburtsdatum</p>
                        {/* Put <a> here to edit with Calendar */}
                        <p>{Birthdate}</p>
                    </div>

                    <div className="nextButtonHolder">
                        <Button onClick={async () => {
                            await stepComplete(FirstName !== '' && LastName !== '' && Street !== '' && City !== '' && ZIP !== '' && Birthdate !== '');
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
    store: (data) => { dispatch({type: actions.ADDCHILD, data }); },
    setBoard: (boardId) => { dispatch({type: actions.ADDBOARD, data: boardId})}
});

export default connect(mapStateToProps, mapDispatchToProps)(withSetupWizardContext(ChildInfo));
