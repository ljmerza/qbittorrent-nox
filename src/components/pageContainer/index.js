import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { Container, withStyles } from '@material-ui/core';

const PageContainer = ({ children, classes }) => {
    return (
        <Container classes={{ root: clsx(classes.pageContainer) }} maxWidth="xl">
            {children}
        </Container>
    );
}

const styles = (/* theme */) => ({
    pageWrapper: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageContainer: {
        flex: 1,
        margin: 0,
        padding: 0
    }
});

PageContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.any.isRequired,
};

const mapStateToProps = state => {
    return {
    };
};

export default compose(
    withStyles(styles),
    connect(
        mapStateToProps,
        null,
    )
)(PageContainer);
