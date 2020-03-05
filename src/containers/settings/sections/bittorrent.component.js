import React from 'react';
import PropTypes from 'prop-types';

import Card from 'components/card.component';
import Text from 'components/fields/text.component';
import Select from 'components/fields/select.component';
import Checkbox from 'components/fields/checkbox.component';
import { Item } from 'components/grid.component';

function BitTorrentSettings({ settings, onChange  }) {
    return (
        <>
            <Card title='Privacy'>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Enable DHT (decentralized network) to find more peers' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Enable Peer Exchange (PeX) to find more peers' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Enable Local Peer Discovery to find more peers' name='' value={settings} onChange={onChange} />
                </Item>
                <Item>
                    <Select label='Encryption mode' value={settings} options={[]} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Enable anonymous mode (More information)' name='' value={settings} onChange={onChange} />
                </Item>
            </Card>
            <Card title='Torrent Queueing'>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Queue torrents' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Maximum active downloads' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Maximum active uploads' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Maximum active torrents' value={settings} onChange={onChange} />
                </Item>

                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Do not count slow torrents in these limits' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Download rate threshold' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Upload rate threshold' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Torrent inactivity timer' value={settings} onChange={onChange} />
                </Item>
            </Card>
            <Card title='Seeding Limits'>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='When ratio reaches' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='When seeding time reaches (minutes)' name='' value={settings} onChange={onChange} />
                </Item>
                <Item>
                    <Select label='Then' value={settings} options={[]} onChange={onChange} />
                </Item>
            </Card>
            <Card title='Auto Add'>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Automatically add these trackers to new downloads' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Trackers' value={settings} onChange={onChange} multiline />
                </Item>
            </Card>
        </>
    )
}

BitTorrentSettings.propTypes = {
    settings: PropTypes.object.isRequired,
}

export default BitTorrentSettings;