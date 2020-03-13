import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Card from 'components/card.component';
import Text from 'components/fields/text.component';
import Select from 'components/fields/select.component';
import Checkbox from 'components/fields/checkbox.component';
import { Container, Item } from 'components/grid.component';

import { MANAGEMENT_MODES, MANAGEMENT_MODE_MANUAL, MANAGEMENT_MODE_AUTOMATIC } from 'utilities/torrent-states';

export const TORRENT_CHANGED_RELOCATE = { id: 'RELOCATE', name: 'Relocate Torrent' };
export const TORRENT_CHANGED_MANUAL = { id: 'MANUAL', name: 'Switch to Manual Mode' };
export const TORRENT_CHANGED_OPTIONS = [
    TORRENT_CHANGED_RELOCATE,
    TORRENT_CHANGED_MANUAL,
];

function DownloadSettings({ settings, onChange }) {
    const auto_tmm_enabled = settings.auto_tmm_enabled ? MANAGEMENT_MODE_AUTOMATIC : MANAGEMENT_MODE_MANUAL;
    const torrent_changed_tmm_enabled = settings.torrent_changed_tmm_enabled ? TORRENT_CHANGED_RELOCATE : TORRENT_CHANGED_MANUAL;
    const save_path_changed_tmm_enabled = settings.save_path_changed_tmm_enabled ? TORRENT_CHANGED_RELOCATE : TORRENT_CHANGED_MANUAL;
    const category_changed_tmm_enabled = settings.category_changed_tmm_enabled ? TORRENT_CHANGED_RELOCATE : TORRENT_CHANGED_MANUAL;

    console.log({settings, auto_tmm_enabled, torrent_changed_tmm_enabled})

    // api doesnt actually have these values just if there's a path set or not
    const [copyTorrentFiles, setCopyTorrentFiles] = useState(!!settings.export_dir);
    const [copyTorrentFilesFinished, setCopyTorrentFilesFinished] = useState(!!settings.export_dir_fin);
    console.log({ copyTorrentFiles, copyTorrentFilesFinished })

    return (
        <>
            <Card title='Adding Torrent'>
                <Item sm={12} md={12} lg={12}>
                    <Checkbox label='Create subfolder for torrents with multiple files' name='create_subfolder_enabled' value={settings.create_subfolder_enabled} onChange={onChange} />
                </Item>
                <Item sm={12} md={12} lg={12}>
                    <Checkbox label='Do not start the download automatically' name='start_paused_enabled' value={settings.start_paused_enabled} onChange={onChange} />
                </Item>
                <Item sm={12} md={12} lg={12}>
                    <Checkbox label='Delete .torrent files afterwards' name='auto_delete_mode' value={!!settings.auto_delete_mode} onChange={onChange} />
                </Item>
                <Item sm={12} md={12} lg={12}>
                    <Checkbox label='Pre-allocate disk space for all torrents' name='preallocate_all' value={settings.preallocate_all} onChange={onChange} />
                </Item>
                <Item sm={12} md={12} lg={12}>
                    <Checkbox label='Append .!qB extension to incomplete files' name='incomplete_files_ext' value={settings.incomplete_files_ext} onChange={onChange} />
                </Item>
            </Card>

            <Card title='Saving Management'>
                <Container>
                    <Item>
                        <Select label='Default torrent management mode' name='auto_tmm_enabled' value={auto_tmm_enabled.id} options={MANAGEMENT_MODES} onChange={onChange} />
                    </Item>
                 </Container>

                <Container>
                    <Item>
                        <Select label='When torrent cagetory changed' name='torrent_changed_tmm_enabled' value={torrent_changed_tmm_enabled.id} options={TORRENT_CHANGED_OPTIONS} onChange={onChange} />
                    </Item>
                    <Item>
                        <Select label='When default save value changed' name='save_path_changed_tmm_enabled' value={save_path_changed_tmm_enabled.id} options={TORRENT_CHANGED_OPTIONS} onChange={onChange} />
                    </Item>
                </Container>

                <Container>
                    <Item>
                        <Select label='When category save path changed' name='category_changed_tmm_enabled' value={category_changed_tmm_enabled.id} options={TORRENT_CHANGED_OPTIONS} onChange={onChange} />
                    </Item>
                    <Item>
                        <Text label='Default save path' value={settings.save_path} onChange={onChange} emptyValue />
                    </Item>
                </Container>

                <Container>
                    <Item sm={12} md={4} lg={4}>
                        <Checkbox label='Keep incomplete torrents' name='temp_path_enabled' value={settings.temp_path_enabled} onChange={onChange} />
                    </Item>
                    <Item sm={12} md={4} lg={4}>
                        <Text label='Incomplete torrents path' name='temp_path' disabled={!settings.temp_path_enabled} value={settings.temp_path} onChange={onChange} emptyValue />
                    </Item>
                </Container>

                <Container>
                    <Item sm={12} md={4} lg={4}>
                        <Checkbox label='Copy .torrent files' name='copyTorrentFiles' value={copyTorrentFiles} onChange={({ target: { value } }) => setCopyTorrentFiles(value)} />
                    </Item>
                    <Item sm={12} md={4} lg={4}>
                        <Text label='Copy .torrent files path' disabled={!copyTorrentFiles} value={settings.export_dir} onChange={onChange} emptyValue />
                    </Item>
                </Container>

                <Container>
                    <Item sm={12} md={4} lg={4}>
                        <Checkbox label='Copy .torrent files for finished downloads' name='copyTorrentFilesFinished' value={copyTorrentFilesFinished} onChange={({ target: { value } }) => setCopyTorrentFilesFinished(value)} />
                    </Item>
                    <Item sm={12} md={4} lg={4}>
                        <Text label='Torrents for finished downloads path' disabled={!copyTorrentFilesFinished} value={settings.export_dir_fin} onChange={onChange} emptyValue />
                    </Item>
                </Container>
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
                <Item sm={12} md={12} lg={12}>
                    <Checkbox 
                        label='Email notification upon download completion' 
                        name='mail_notification_enabled' 
                        value={settings.mail_notification_enabled} 
                        onChange={onChange} 
                    />
                </Item>
                <Item>
                    <Text 
                        label='From' 
                        name='mail_notification_sender' 
                        disabled={!settings.mail_notification_enabled} 
                        value={settings.mail_notification_sender} 
                        onChange={onChange} 
                        emptyValue 
                    />
                </Item>
                <Item>
                    <Text 
                        label='To' 
                        name='mail_notification_email' 
                        disabled={!settings.mail_notification_enabled} 
                        value={settings.mail_notification_email} 
                        onChange={onChange} 
                        emptyValue 
                    />
                </Item>
                <Item>
                    <Text 
                        label='SMTP server' 
                        name='mail_notification_smtp' 
                        disabled={!settings.mail_notification_enabled} 
                        value={settings.mail_notification_smtp} 
                        onChange={onChange} 
                        emptyValue 
                    />
                </Item>

                <Container>
                    <Item sm={12} md={12} lg={12}>
                        <Checkbox 
                            label='This server requires a secure connection' 
                            name='mail_notification_ssl_enabled' 
                            disabled={!settings.mail_notification_enabled} 
                            value={settings.mail_notification_ssl_enabled} 
                            onChange={onChange} />
                    </Item>
                </Container>

                <Container>
                    <Item>
                        <Checkbox 
                            label='Authentication' 
                            name='mail_notification_auth_enabled' 
                            disabled={!settings.mail_notification_enabled} 
                            value={settings.mail_notification_auth_enabled} 
                            onChange={onChange} 
                            emptyValue
                        />
                    </Item>
                </Container>
                <Container>
                    <Item>
                        <Text 
                            label='Username' 
                            name='mail_notification_username' 
                            disabled={!settings.mail_notification_enabled || !settings.mail_notification_auth_enabled} 
                            value={settings.mail_notification_username} 
                            onChange={onChange} 
                            emptyValue 
                        />
                    </Item>
                    <Item>
                        <Text 
                            label='Password' 
                            name='mail_notification_password' 
                            disabled={!settings.mail_notification_enabled || !settings.mail_notification_auth_enabled} 
                            value={settings.mail_notification_password} 
                            onChange={onChange} 
                            emptyValue 
                        />
                    </Item>
                </Container>
            </Card>

            <Card title='External Program on Completion'>
                <Item sm={12} md={12} lg={12}>
                    <Checkbox label='Run external program on torrent completion' name='autorun_enabled' value={settings.autorun_enabled} onChange={onChange} />
                </Item>
                <Item sm={12} md={12} lg={12}>
                    <Text label='Command' name='autorun_program' rows='2' value={settings.autorun_program} onChange={onChange} multiline emptyValue />
                </Item>
                <Item sm={12} md={12} lg={12}>
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