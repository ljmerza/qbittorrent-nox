import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import PageContainer from 'components/pageContainer';
import LoadingIndicator from 'components/LoadingIndicator';
import BottomNav from './bottomNavigation';

import { getConfigConfig, getConfigLoading } from './config.selectors';

function SettingsContainer({ settings, loading }) {
    console.log({ settings })

    return (
        <PageContainer>
            {/* only show loading indicator if this is the first load of torrents */}
            {loading ? <LoadingIndicator /> : (
                <>

                    <BottomNav />
                </>
            )}
        </PageContainer>
    );
}

SettingsContainer.propTypes = {
    settings: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        settings: getConfigConfig(state),
        loading: getConfigLoading(state),
    }
};


export default compose(
    connect(
        mapStateToProps,
        null
    )
)(SettingsContainer);