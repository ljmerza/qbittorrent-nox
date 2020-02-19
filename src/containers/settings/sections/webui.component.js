import React from 'react';
import PropTypes from 'prop-types';

import Card from 'components/card.component';
import Text from 'components/fields/text.component';
import TextSave from 'components/fields/textSave.component';
import MultipleSelect from 'components/fields/multipleSelect.component';
import Select from 'components/fields/select.component';
import Checkbox from 'components/fields/checkbox.component';
import { Item } from 'components/grid.component';

function WebUISettings({ settings, onChange  }) {
    return (
        <>
            <Card title='Language'>

            </Card>
            <Card title='Web User Interface'>

            </Card>
            <Card title='Authentication'>

            </Card>
            <Card title='Alternate Web UI'>

            </Card>
            <Card title='Security'>

            </Card>
            <Card title='DNS'>

            </Card>
        </>
    )
}

WebUISettings.propTypes = {
    settings: PropTypes.object.isRequired,
}

export default WebUISettings;