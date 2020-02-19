import React from 'react';
import PropTypes from 'prop-types';

import Card from 'components/card.component';
import Text from 'components/fields/text.component';
import TextSave from 'components/fields/textSave.component';
import MultipleSelect from 'components/fields/multipleSelect.component';
import Select from 'components/fields/select.component';
import Checkbox from 'components/fields/checkbox.component';
import { Item } from 'components/grid.component';

function SpeedSettings({ settings, onChange  }) {
    return (
        <>
            <Card title='Global Rate Limits'>
                
            </Card>
            <Card title='Alternative Rate Limits'>
                
            </Card>
            <Card title='Rate Limit Settings'>
                
            </Card>
        </>
    )
}

SpeedSettings.propTypes = {
    settings: PropTypes.object.isRequired,
}

export default SpeedSettings;