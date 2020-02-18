import React from 'react';
import PropTypes from 'prop-types';

function BitTorrentSettings({ settings }) {
    return (
        <div>
            BitTorrentSettings
        </div>
    )
}

BitTorrentSettings.propTypes = {
    settings: PropTypes.object.isRequired,
}

export default BitTorrentSettings;