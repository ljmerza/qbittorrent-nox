import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ValidatorForm } from 'react-material-ui-form-validator';
import cloneDeep from 'lodash/cloneDeep';

import { FormControl, InputAdornment, IconButton, withStyles } from '@material-ui/core';

import uuid from 'utilities/uuid';
import { Item } from 'components/grid.component';
import PageContainer from 'components/pageContainer';
import Card from 'components/card.component';
import LoadingIndicator from 'components/LoadingIndicator';
import TextValidator from 'components/fields/textValidator.component';
import Text from 'components/fields/text.component';
import PrimaryButton from 'components/buttons/primary.component';

import { loginActions } from 'containers/login/login.reducer';
import { getLoginLoginInfo } from 'containers/login/login.selectors';
import { CreditCardSharp } from '@material-ui/icons';

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
        this.setState(oldState => {
            const credsIndex = oldState.loginInfo.findIndex(oldCreds => oldCreds.id !== creds.id);
            if (credsIndex === -1) return { loginInfo: [...oldState.loginInfo, creds] };
            return oldState;
        }, () => this.props.saveCreds(creds));
    }

    deleteCreds = (event, creds) => {
        this.setState(oldState => ({ loginInfo: oldState.loginInfo.filter(oldCreds => oldCreds.id !== creds.id) }), () => {

        }, () => {
            // we dont need to update state if deleting new creds
            if (creds._isNew) return;
            this.props.deleteCreds(creds);
        });
    }

    setDefaultCreds = (event, creds) => {
        this.setState(oldState => {
            const matchingCreds = oldState.loginInfo.map(oldCreds => {
                oldCreds = { ...oldCreds };
                oldCreds.default = oldCreds.id === creds.id;
                return oldCreds;
            });

            return { loginInfo: matchingCreds };
        }, () => this.props.setDefaultCreds(creds));
    }

    render() {
        const { classes } = this.props;
        const { loginInfo, loading } = this.state;
        console.log({ t: this.state })

        // only allow one new form at a time
        const hasIsNew = !!loginInfo.find(creds => creds._isNew);

        return (
            <PageContainer>
                {loading ? <LoadingIndicator /> : null}
                
                {loginInfo.map(creds => {
                    const _onChange = event => this.onChange(event, creds);
                    const _saveCreds = event => this.saveCreds(event, creds);
                    const _deleteCreds = event => this.deleteCreds(event, creds);
                    const _setDefaultCreds = event => this.setDefaultCreds(event, creds);

                    return (
                        <ValidatorForm onSubmit={_saveCreds} className={classes.formContainer}>
                            <Card>
                                <FormControl className={classes.fieldWrapper}>
                                    <TextValidator name='username' label='Username' value={creds.username} onChange={_onChange} emptyValue fullWidth  />
                                </FormControl>
                                <FormControl className={classes.fieldWrapper}>
                                    <TextValidator name='password' label='Password' value={creds.password} onChange={_onChange} emptyValue fullWidth />
                                </FormControl>
                                <FormControl className={classes.fieldWrapper}>
                                    <TextValidator name='url' label='Url' value={creds.url} onChange={_onChange} emptyValue fullWidth />
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

                {hasIsNew ? null : (
                    <div className={classes.newButton}>
                        <PrimaryButton size="large" variant="contained" color='primary' onClick={this.createNewCreds}>Create New</PrimaryButton>
                    </div>
                )}

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
    newButton: {
        marginTop: theme.spacing(3),
        display: 'flex',
        justifyContent: 'center',
    }
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
