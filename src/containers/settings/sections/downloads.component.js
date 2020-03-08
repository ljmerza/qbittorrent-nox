import React from 'react';
import PropTypes from 'prop-types';

import Card from 'components/card.component';
import Text from 'components/fields/text.component';
import Select from 'components/fields/select.component';
import Checkbox from 'components/fields/checkbox.component';
import { Item } from 'components/grid.component';

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

    return (
        <>
            <Card title='Adding Torrent'>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Create subfolder for torrents with multiple files' name='create_subfolder_enabled' value={settings.create_subfolder_enabled} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Do not start the download automatically' name='start_paused_enabled' value={settings.start_paused_enabled} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Delete .torrent files afterwards' name='auto_delete_mode' value={!!settings.auto_delete_mode} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Pre-allocate disk space for all torrents' name='preallocate_all' value={settings.preallocate_all} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Append .!qB extension to incomplete files' name='incomplete_files_ext' value={settings.incomplete_files_ext} onChange={onChange} />
                </Item>
            </Card>

            <Card title='Saving Management'>
                <Item>
                    <Select label='Default torrent management mode' name='auto_tmm_enabled' value={auto_tmm_enabled.id} options={MANAGEMENT_MODES} onChange={onChange} />
                </Item>
                <Item>
                    <Select label='When torrent cagetory changed' name='torrent_changed_tmm_enabled' value={torrent_changed_tmm_enabled.id} options={TORRENT_CHANGED_OPTIONS} onChange={onChange} />
                </Item>
                <Item>
                    <Select label='When default save value changed' name='save_path_changed_tmm_enabled' value={save_path_changed_tmm_enabled.id} options={TORRENT_CHANGED_OPTIONS} onChange={onChange} />
                </Item>
                <Item>
                    <Select label='When category save path changed' name='category_changed_tmm_enabled' value={category_changed_tmm_enabled.id} options={TORRENT_CHANGED_OPTIONS} onChange={onChange} />
                </Item>

                <Item>
                    <Text label='Default save path' value={settings.save_path} onChange={onChange} />
                </Item>

                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Keep incomplete torrents' name='temp_path_enabled' value={settings.temp_path_enabled} onChange={onChange} />
                </Item>
                <Item>
                    <Text label='Incomplete torrents path' name='temp_path' value={settings.temp_path} onChange={onChange} />
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
                    <Checkbox label='Email notification upon download completion' name='mail_notification_enabled' value={settings.mail_notification_enabled} onChange={onChange} />
                </Item>
                <Item>
                    <Text label='From' name='mail_notification_sender' value={settings.mail_notification_sender} onChange={onChange} />
                </Item>
                <Item>
                    <Text label='To' name='mail_notification_email' value={settings.mail_notification_email} onChange={onChange} />
                </Item>
                <Item>
                    <Text label='SMTP server' name='mail_notification_smtp' value={settings.mail_notification_smtp} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='This server requires a secure connection' name='mail_notification_ssl_enabled' value={settings.mail_notification_ssl_enabled} onChange={onChange} />
                </Item>

                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Authentication' name='mail_notification_auth_enabled' value={settings.mail_notification_auth_enabled} onChange={onChange} />
                </Item>
                <Item>
                    <Text label='Username' name='mail_notification_username' value={settings.mail_notification_username} onChange={onChange} />
                </Item>
                <Item>
                    <Text label='Password' name='mail_notification_password' value={settings.mail_notification_password} onChange={onChange} />
                </Item>
            </Card>

            <Card title='External Program on Completion'>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Run external program on torrent completion' name='autorun_enabled' value={settings.autorun_enabled} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Command' name='autorun_program' value={settings.autorun_program} onChange={onChange} multiline />
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