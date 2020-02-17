import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import PageContainer from 'components/pageContainer';
import LoadingIndicator from 'components/LoadingIndicator';
import BottomNav from './bottomNavigation';

import { getConfigConfig, getConfigLoading } from './config.selectors';

import { 
    AdvancedSettings, BitTorrentSettings, ConnectionSettings, 
    DownloadSettings, SpeedSettings, WebUISettings, SECTION_NAMES,
} from './sections';

function SettingsContainer({ settings, loading }) {
    const [settingsTab, setSettingsTab] = useState(0);

    if (loading){
        return (
            <PageContainer>
                <LoadingIndicator />
            </PageContainer>
        );
    }

    let content = null;
    switch (settingsTab){
        case SECTION_NAMES.advanced.key: 
            content = <AdvancedSettings settings={settings} />;
            break;
        case SECTION_NAMES.bitTorrent.key:
            content = <BitTorrentSettings settings={settings} />;
            break;
        case SECTION_NAMES.connection.key:
            content = <ConnectionSettings settings={settings} />;
            break;
        case SECTION_NAMES.speed.key:
            content = <SpeedSettings settings={settings} />;
            break;
        case SECTION_NAMES.webUi.key:
            content = <WebUISettings settings={settings} />;
            break;
        default:
            content = <DownloadSettings settings={settings} />;
    }

    return (
        <PageContainer>
            {content}
            <BottomNav setSettingsTab={setSettingsTab} />
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