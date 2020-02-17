import React from 'react';
import PropTypes from 'prop-types';

function AdvancedSettings({ settings }) {
    return (
        <div>
            AdvancedSettings
        </div>
    )
}

AdvancedSettings.propTypes = {
    settings: PropTypes.object.isRequired,
}

export default AdvancedSettings;