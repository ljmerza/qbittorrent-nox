import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ValidatorForm } from 'react-material-ui-form-validator';

import { FormControl, InputAdornment, IconButton, withStyles } from '@material-ui/core';
import { PermIdentity, Lock, VisibilityOff, Visibility } from '@material-ui/icons';

import PrimaryButton from 'components/buttons/primary.component';
import TextValidator from 'components/fields/textValidator.component';
import Select from 'components/fields/select.component';
import PageContainer from 'components/pageContainer';
import LoadingIndicator from 'components/LoadingIndicator';

import { loginActions } from './login.reducer';
import { getLoginUsername, getLoginPassword, getLoginUrl, getLoginLoading, getLoginLoginInfo } from './login.selectors';

class LoginContainer extends PureComponent {
    constructor(props){
        super(props);

        this.state = {
            username: props.username,
            password: props.password,
            url: props.url,
            showPassword: false,
        };
    }

    onChange = ({ target: { name, value } }) => this.setState({ [name]: value });

    handleToggleShowPassword = () => this.setState(prevState => ({ showPassword: !prevState.showPassword }));

    handleSubmit = () => this.props.login(this.state);

    editCreds = event => {
        event.preventDefault();
        this.props.history.push('/credentials');
    }

    render() {
        const { classes, theme, loading, loginInfo } = this.props;
        const { username, password, url, showPassword, } = this.state;

        const urlOptions = loginInfo.map(creds => ({ id: creds.url, name: creds.url }));

        return (
            <PageContainer>
                {loading ? <LoadingIndicator /> : null}
                <ValidatorForm onSubmit={this.handleSubmit} className={classes.formContainer}>
                    <FormControl className={classes.fieldWrapper}>
                        <TextValidator
                            type="text"
                            name="username"
                            label="username"
                            value={username}
                            onChange={this.onChange}
                            emptyValue
                            fullWidth
                            validators={['required']}
                            errorMessages={['Username is required']}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PermIdentity style={{ color: theme.palette.grey[500] }} />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </FormControl>

                    <FormControl className={classes.fieldWrapper}>
                        <TextValidator
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            label="Password"
                            value={password}
                            onChange={this.onChange}
                            emptyValue
                            fullWidth
                            validators={['required']}
                            errorMessages={['Password is required']}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock style={{ color: theme.palette.grey[500] }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Toggle password visibility"
                                            onClick={this.handleToggleShowPassword}
                                            style={{ color: theme.palette.grey[500] }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </FormControl>

                    <Select 
                        className={classes.fullWidth} 
                        label='URL (optional)' 
                        value={url} 
                        options={urlOptions} 
                        onChange={this.onChange} 
                    />

                    <div className={classes.buttonsWrapper}>
                        <PrimaryButton fullWidth type="submit" size="large" color="primary" variant="contained">
                            Login
                        </PrimaryButton>
                    </div>

                    <div className={classes.buttonsWrapper} onClick={this.editCreds}>
                        <PrimaryButton color='secondary' fullWidth type="submit" size="large" variant="contained">
                            Edit Credentials
                        </PrimaryButton>
                    </div>

                </ValidatorForm>
            </PageContainer>
        );
    }
}

const styles = (/* theme */) => ({
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 600,
        margin: 'auto',
        marginTop: '3rem',
        padding: '0.5rem',
    },
    fieldWrapper: {
        width: '100%'
    },
    buttonsWrapper: {
        marginTop: '1rem',
        width: '100%',
    },
    fullWidth: {
        width: '100%',
        marginRight: 0,
    }
});

LoginContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    loginInfo: PropTypes.array.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
};

const mapStateToProps = state => {
    return {
        username: getLoginUsername(state),
        password: getLoginPassword(state),
        url: getLoginUrl(state),
        loading: getLoginLoading(state),
        loginInfo: getLoginLoginInfo(state),
    }
};

function mapDispatchToProps(dispatch) {
    return {
        login: payload => dispatch(loginActions.login(payload)),
    };
}

export default compose(
    withStyles(styles, { withTheme: true }),
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(LoginContainer);
