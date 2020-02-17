import React from 'react';
import PropTypes from 'prop-types';

function ConnectionSettings({ settings }) {
    return (
        <div>
            ConnectionSettings
        </div>
    )
}

ConnectionSettings.propTypes = {
    settings: PropTypes.object.isRequired,
}

export default ConnectionSettings;