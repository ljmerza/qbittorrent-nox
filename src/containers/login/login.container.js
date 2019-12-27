import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { ValidatorForm } from 'react-material-ui-form-validator';

import { FormControl, InputAdornment, IconButton, withStyles } from '@material-ui/core';
import { PermIdentity, Lock, VisibilityOff, Visibility } from '@material-ui/icons';

import PrimaryButton from '../../components/buttons/primary.component';
import TextValidator from '../../components/fields/textValidator.component';
import PageContainer from '../../components/pageContainer';
import LoadingIndicator from '../../components/LoadingIndicator';

import { loginActions } from './login.reducer';

class LoginContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: props.username,
            password: props.password,
            showPassword: false,
        };
    }

    onChange = ({ target: { name, value } }) => this.setState({ [name]: value });

    handleToggleShowPassword = () =>
        this.setState(prevState => ({ showPassword: !prevState.showPassword }));

    handleSubmit = () => {
        const { username, password } = this.state;
        this.props.login({ username, password });
    };

    render() {
        const { classes, theme, loading } = this.props;
        const { username, password, showPassword } = this.state;

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

                    <div className={classes.buttonsWrapper}>
                        <PrimaryButton fullWidth type="submit" size="large" color="primary" variant="contained">
                            Login
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
        width: '100%'
    }
});

LoginContainer.propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    classes: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
    return {
        loading: state.login.loading,
        error: state.login.error,
        username: state.login.username,
        password: state.login.password,
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
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(LoginContainer);