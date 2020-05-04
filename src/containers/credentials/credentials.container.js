import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ValidatorForm } from 'react-material-ui-form-validator';
import clsx from 'clsx';

import { FormControl, withStyles, ButtonGroup } from '@material-ui/core';

import uuid from 'utilities/uuid';
import PageContainer from 'components/pageContainer';
import Card from 'components/card.component';
import LoadingIndicator from 'components/LoadingIndicator';
import TextValidator from 'components/fields/textValidator.component';
import PrimaryButton from 'components/buttons/primary.component';

import { loginActions } from 'containers/login/login.reducer';
import { getLoginLoginInfo } from 'containers/login/login.selectors';

export class CredentialsContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            loginInfo: props.loginInfo,
            loading: false,
        }
    }

    onChange = ({ target: { name, value } }, creds) => {
        this.setState(oldState => {
            const matchingCreds = oldState.loginInfo.map(oldCreds => {
                if (oldCreds.id === creds.id) {
                    oldCreds = { ...oldCreds };
                    oldCreds[name] = value;
                }
                return oldCreds;
            });

            return { loginInfo: matchingCreds };
        });
    }

    createNewCreds = () => {
        this.setState(oldState => ({ loginInfo: [...oldState.loginInfo, { username: '', password: '', url: '', id: uuid(), _isNew: true }] }))
    }

    saveCreds = (event, creds) => {
        if (!creds.username || !creds.password) return;

        const { _isNew, ...newCreds } = creds;
        this.props.saveCreds(newCreds);

        if (!_isNew) return;

        // update he temp creds with the newly created one
        this.setState(oldState => {
            const matchingCreds = oldState.loginInfo.map(oldCreds => {
                if (newCreds.id === oldCreds.id) {
                    // set as default if only cred given
                    if (oldState.loginInfo.length === 1) newCreds.default = true;
                    return newCreds;
                }
                return oldCreds;
            });
            console.log({ matchingCreds})
            return { loginInfo: matchingCreds };
        });
    }

    deleteCreds = (event, creds) => {
        this.setState(oldState => ({ loginInfo: oldState.loginInfo.filter(oldCreds => oldCreds.id !== creds.id) }));

        if (creds._isNew) return;
        this.props.deleteCreds(creds);
    }

    setDefaultCreds = (event, creds) => {
        this.props.setDefaultCreds(creds);

        this.setState(oldState => {
            const matchingCreds = oldState.loginInfo.map(oldCreds => {
                oldCreds = { ...oldCreds };
                oldCreds.default = oldCreds.id === creds.id;
                return oldCreds;
            });

            return { loginInfo: matchingCreds };
        });
    }

    goBack = () => this.props.history.push('/login');

    render() {
        const { classes } = this.props;
        const { loginInfo, loading } = this.state;

        // only allow one new form at a time
        const hasIsNew = !!loginInfo.find(creds => creds._isNew);
        const noCreds = loginInfo.length === 0;

        return (
            <PageContainer>
                {loading ? <LoadingIndicator /> : null}
                
                {loginInfo.map(creds => {
                    const _onChange = event => this.onChange(event, creds);
                    const _saveCreds = event => this.saveCreds(event, creds);
                    const _deleteCreds = event => this.deleteCreds(event, creds);
                    const _setDefaultCreds = event => this.setDefaultCreds(event, creds);

                    return (
                        <ValidatorForm onSubmit={_saveCreds} className={classes.formContainer} key={creds.id}>
                            <Card title={creds.default ? 'Default' : ''}>
                                <FormControl className={classes.fieldWrapper}>
                                    <TextValidator 
                                        name='username'
                                        label='Username'
                                        value={creds.username}
                                        onChange={_onChange}
                                        emptyValue
                                        fullWidth
                                        validators={['required']}
                                        errorMessages={['Username is required']}
                                    />
                                </FormControl>
                                <FormControl className={classes.fieldWrapper}>
                                    <TextValidator 
                                        type='password' 
                                        name='password' 
                                        label='Password' 
                                        value={creds.password}
                                        onChange={_onChange}
                                        emptyValue
                                        fullWidth
                                        validators={['required']}
                                        errorMessages={['Password is required']}
                                    />
                                </FormControl>
                                <FormControl className={classes.fieldWrapper}>
                                    <TextValidator 
                                        name='url' 
                                        label='Url' 
                                        value={creds.url} 
                                        onChange={_onChange}
                                        emptyValue
                                        fullWidth
                                    />
                                </FormControl>

                                <div className={classes.actionButtons}>
                                    <PrimaryButton size="large" variant="outlined" color='secondary' onClick={_deleteCreds}>Delete</PrimaryButton>
                                    {creds._isNew ? null : <PrimaryButton size="large" variant="outlined" color='secondary' onClick={_setDefaultCreds}>Set Default</PrimaryButton>}
                                    <PrimaryButton type="submit" size="large" variant="contained" color='primary'>Save</PrimaryButton>
                                </div>
                            </Card>
                        </ValidatorForm>
                    );
                })}

                <div className={clsx(classes.bottomActionButtons, { [classes.bottomActionButtonsNoCreds]: noCreds })}>
                    <ButtonGroup variant="text">
                        {hasIsNew ? null : <PrimaryButton size="large" variant="contained" color='primary' onClick={this.createNewCreds}>Create New</PrimaryButton>}
                        <PrimaryButton size="large" variant="outlined" color='secondary' onClick={this.goBack}>Back to Login</PrimaryButton>
                    </ButtonGroup>
                </div>

            </PageContainer>
        )
    }
}

const styles = theme => ({
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 600,
        margin: 'auto',
        padding: '0.5rem',
    },
    fieldWrapper: {
        width: '100%'
    },
    actionButtons: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    bottomActionButtons: {
        display: 'flex',
        justifyContent: 'center',
    },
    bottomActionButtonsNoCreds: {
        marginTop: theme.spacing(10),
    },
});

CredentialsContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    loginInfo: PropTypes.array.isRequired,
    saveCreds: PropTypes.func.isRequired,
    deleteCreds: PropTypes.func.isRequired,
    setDefaultCreds: PropTypes.func.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
};

const mapStateToProps = state => {
    return {
        loginInfo: getLoginLoginInfo(state),
    }
};

function mapDispatchToProps(dispatch) {
    return {
        saveCreds: payload => dispatch(loginActions.saveCreds(payload)),
        deleteCreds: payload => dispatch(loginActions.deleteCreds(payload)),
        setDefaultCreds: payload => dispatch(loginActions.setDefaultCreds(payload)),
    };
}

export default compose(
    withStyles(styles, { withTheme: true }),
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(CredentialsContainer);
