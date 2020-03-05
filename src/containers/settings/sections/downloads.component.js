import React from 'react';
import PropTypes from 'prop-types';

import Card from 'components/card.component';
import Text from 'components/fields/text.component';
import Select from 'components/fields/select.component';
import Checkbox from 'components/fields/checkbox.component';
import { Item } from 'components/grid.component';

function DownloadSettings({ settings, onChange }) {
    return (
        <>
            <Card title='Adding Torrent'>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Create subfolder for torrents with multiple files' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Do not start the download automatically' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Delete .torrent files afterwards' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Pre-allocate disk space for all torrents' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Append .!qB extension to incomplete files' name='' value={settings} onChange={onChange} />
                </Item>
            </Card>

            <Card title='Saving Management'>
                <Item>
                    <Select label='Default torrent management mode' value={settings} options={[]} onChange={onChange} />
                </Item>
                <Item>
                    <Select label='When torrent cagetory changed' value={settings} options={[]} onChange={onChange} />
                </Item>
                <Item>
                    <Select label='When default save value changed' value={settings} options={[]} onChange={onChange} />
                </Item>
                <Item>
                    <Select label='When category save path changed' value={settings} options={[]} onChange={onChange} />
                </Item>

                <Item>
                    <Text label='Default save path' value={settings} onChange={onChange} />
                </Item>

                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Keep incomplete torrents' name='' value={settings} onChange={onChange} />
                </Item>
                <Item>
                    <Text label='Incomplete torrents path' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Copy .torrent files' name='' value={settings} onChange={onChange} />
                </Item>
                <Item>
                    <Text label='Copy .torrent files path' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Copy .torrent files for finished downloads' name='' value={settings} onChange={onChange} />
                </Item>
                <Item>
                    <Text label='Torrents for finished downloads path' value={settings} onChange={onChange} />
                </Item>
            </Card>

            <Card title='Automatically Add Torrents'>
                <Item>
                    <Text label='Monitored folder' value={settings} onChange={onChange} />
                </Item>
                <Item>
                    <Text label='Override Save Location' value={settings} onChange={onChange} />
                </Item>
            </Card>

            <Card title='Email Notifications on Completion'>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Email notification upon download completion' name='' value={settings} onChange={onChange} />
                </Item>
                <Item>
                    <Text label='From' value={settings} onChange={onChange} />
                </Item>
                <Item>
                    <Text label='To' value={settings} onChange={onChange} />
                </Item>
                <Item>
                    <Text label='SMTP server' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='This server requires a secure connection' name='' value={settings} onChange={onChange} />
                </Item>

                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Authentication' name='' value={settings} onChange={onChange} />
                </Item>
                <Item>
                    <Text label='Username' value={settings} onChange={onChange} />
                </Item>
                <Item>
                    <Text label='Password' value={settings} onChange={onChange} />
                </Item>
            </Card>

            <Card title='External Program on Completion'>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Run external program on torrent completion' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Command' value={settings} onChange={onChange} multiline />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    Supported parameters (case sensitive):

                        %N: Torrent name
                        %L: Category
                        %G: Tags (separated by comma)
                        %F: Content path (same as root path for multifile torrent)
                        %R: Root path (first torrent subdirectory path)
                        %D: Save path
                        %C: Number of files
                        %Z: Torrent size (bytes)
                        %T: Current tracker
                        %I: Info hash

                    Tip: Encapsulate parameter with quotation marks to avoid text being cut off at whitespace (e.g., "%N")
                </Item>
            </Card>
        </>
    )
}

DownloadSettings.propTypes = {
    settings: PropTypes.object.isRequired,
}

export default DownloadSettings;