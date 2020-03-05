import React from 'react';
import PropTypes from 'prop-types';

import Card from 'components/card.component';
import Text from 'components/fields/text.component';
import Select from 'components/fields/select.component';
import Checkbox from 'components/fields/checkbox.component';
import { Item } from 'components/grid.component';

function SpeedSettings({ settings, onChange  }) {
    return (
        <>
            <Card title='Global Rate Limits'>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Upload' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Download' value={settings} onChange={onChange} />
                </Item>
            </Card>
            <Card title='Alternative Rate Limits'>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Upload' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Download' value={settings} onChange={onChange} />
                </Item>
                <Item>
                    <Select label='When' value={settings} options={[]} onChange={onChange} />
                </Item>
            </Card>
            <Card title='Rate Limit Settings'>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Apply rate limit to µTP protocol' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Apply rate limit to transport overhead' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Apply rate limit to peers on LAN' name='' value={settings} onChange={onChange} />
                </Item>
            </Card>
        </>
    )
}

SpeedSettings.propTypes = {
    settings: PropTypes.object.isRequired,
}

export default SpeedSettings;