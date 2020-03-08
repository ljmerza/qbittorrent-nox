import React from 'react';
import PropTypes from 'prop-types';

import Card from 'components/card.component';
import Text from 'components/fields/text.component';
import Select from 'components/fields/select.component';
import Checkbox from 'components/fields/checkbox.component';
import { Item } from 'components/grid.component';

export const MAX_RATIO_ACTION_PAUSE = { id: 0, name: 'Pause Torrent' };
export const MAX_RATIO_ACTION_REMOVE = { id: 1, name: 'Remove Torrent' };
export const MAX_RATIO_ACTION_OPTIONS = [
    MAX_RATIO_ACTION_PAUSE,
    MAX_RATIO_ACTION_REMOVE,
];

function BitTorrentSettings({ settings, onChange  }) {
    const max_ratio_act = settings.max_ratio_act ? MAX_RATIO_ACTION_REMOVE : MAX_RATIO_ACTION_PAUSE;
    
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
                    <Checkbox label='Queue torrents' name='queueing_enabled' value={settings.queueing_enabled} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Maximum active downloads' name='max_active_downloads' value={settings.max_active_downloads} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Maximum active uploads' name='max_active_uploads' value={settings.max_active_uploads} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Maximum active torrents' name='max_active_torrents' value={settings.max_active_torrents} onChange={onChange} />
                </Item>

                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Do not count slow torrents in these limits' name='dont_count_slow_torrents' value={settings.dont_count_slow_torrents} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Download rate threshold' name='slow_torrent_dl_rate_threshold' value={settings.slow_torrent_dl_rate_threshold} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Upload rate threshold' name='slow_torrent_ul_rate_threshold' value={settings.slow_torrent_ul_rate_threshold} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Torrent inactivity timer' name='slow_torrent_inactive_timer' value={settings.slow_torrent_inactive_timer} onChange={onChange} />
                </Item>
            </Card>
            <Card title='Seeding Limits'>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='When ratio reaches' name='max_ratio_enabled' value={settings.max_ratio_enabled} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Ratio' name='max_ratio' value={settings.max_ratio} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='When seeding time reaches (minutes)' name='max_ratio_enabled' value={settings.max_ratio_enabled} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Minutes' name='max_ratio' value={settings.max_ratio} onChange={onChange} />
                </Item>
                <Item>
                    <Select label='Then' value={max_ratio_act.id} options={MAX_RATIO_ACTION_OPTIONS} onChange={onChange} />
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