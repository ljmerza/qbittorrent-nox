import React from 'react';
import PropTypes from 'prop-types';

import Card from 'components/card.component';
import Text from 'components/fields/text.component';
import Select from 'components/fields/select.component';
import Checkbox from 'components/fields/checkbox.component';
import { Item } from 'components/grid.component';

function ConnectionSettings({ settings, onChange  }) {
    return (
        <>
            <Card title='Connections'>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Incoming Connections Port' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Use UPnp / NAT-PMP port frowarding' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Use different port on each start up' name='' value={settings} onChange={onChange} />
                </Item>
            </Card>

            <Card title='Limits'>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Global maximum number of connections' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Global maximum number of connections per torrent' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Global maximum number of upload slots' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Global maximum number of upload slots per torrent' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='' value={settings} onChange={onChange} />
                </Item>
            </Card>

            <Card title='Proxy'>
                <Item sm={12} md={6} lg={6}>
                    <Select label='Type' value={settings} options={[]} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Host' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Port' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Use proxy for peer connections' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Use proxy only for torrents' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Authentication' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Username' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Password' value={settings} onChange={onChange} />
                </Item>
            </Card>

            <Card title='IP Filtering'>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='IP Filtering' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Filter Path (.dat, .p2p, .p2b)' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Apply to trackers' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text
                        label='Manually banned IP addresses'
                        value={settings}
                        onChange={onChange}
                        multiline
                        emptyValue
                        autoFocus
                        rows='5'
                    />
                </Item>
            </Card>
        </>
    )
}

ConnectionSettings.propTypes = {
    settings: PropTypes.object.isRequired,
}

export default ConnectionSettings;