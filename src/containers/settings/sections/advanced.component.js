import React from 'react';
import PropTypes from 'prop-types';

import Card from 'components/card.component';
import Text from 'components/fields/text.component';
import Select from 'components/fields/select.component';
import Checkbox from 'components/fields/checkbox.component';
import { Item } from 'components/grid.component';

function AdvancedSettings({ settings, onChange  }) {
    return (
        <>
            <Card title='qBittorrent'>
                <Item>
                    <Select label='Network Interface (requires restart)' value={settings} options={[]} onChange={onChange} />
                </Item>
                <Item>
                    <Select label='Optional IP Address to bind to (requires restart)' value={settings} options={[]} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Listen on IPv6 address (requires restart)' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Save resume data interval' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Recheck torrents on completion' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Resolve peer countries (GeoIP)' name='' value={settings} onChange={onChange} />
                </Item>
            </Card>
            <Card title='Libtorrent'>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Asynchronous I/O threads' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='File pool size' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Outstanding memory when checking torrents' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Disk cache' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Disk cache expiry interval' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Enable OS cache' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Coalesce reads & writes' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Send upload piece suggestions' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Send buffer watermark' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Send buffer low watermark' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Send buffer watermark factor' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Socket backlog size' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Outgoing ports (Min) [0: Disabled]' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Outgoing ports (Max) [0: Disabled]' value={settings} onChange={onChange} />
                </Item>
                <Item>
                    <Select label='μTP-TCP mixed mode algorithm' value={settings} options={[]} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Allow multiple connections from the same IP address' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Enable embedded tracker' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Embedded tracker port' value={settings} onChange={onChange} />
                </Item>
                <Item>
                    <Select label='Upload slots behavior' value={settings} options={[]} onChange={onChange} />
                </Item>
                <Item>
                    <Select label='Upload choking algorithm' value={settings} options={[]} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Strict super seeding' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Always announce to all trackers in a tier' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Always announce to all tiers' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='IP Address to report to trackers (requires restart)' value={settings} onChange={onChange} />
                </Item>
            </Card>
        </>
    )
}

AdvancedSettings.propTypes = {
    settings: PropTypes.object.isRequired,
}

export default AdvancedSettings;