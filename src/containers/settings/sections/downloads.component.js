import React from 'react';
import PropTypes from 'prop-types';

function DownloadSettings({ settings }) {
    return (
        <div>
            DownloadSettings
        </div>
    )
}

DownloadSettings.propTypes = {
    settings: PropTypes.object.isRequired,
}

export default DownloadSettings;