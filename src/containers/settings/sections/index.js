import SettingsIcon from '@material-ui/icons/Settings';

export { default as AdvancedSettings } from './advanced.component';
export { default as BitTorrentSettings } from './bittorrent.component';
export { default as ConnectionSettings } from './connection.component';
export { default as DownloadSettings} from './downloads.component';
export { default as SpeedSettings } from './speed.component';
export { default as WebUISettings } from './webui.component';


export const SECTION_NAMES = {
    downloads: { key: 'downloads', name: 'Downloads', icon: SettingsIcon },
    connection: { key: 'connection', name: 'Connection', icon: SettingsIcon },
    speed: { key: 'speed', name: 'Speed', icon: SettingsIcon },
    bitTorrent: { key: 'bittorrent', name: 'Bittorrent', icon: SettingsIcon },
    webUi: { key: 'webui', name: 'Web UI', icon: SettingsIcon },
    advanced: { key: 'advanced', name: 'Advanced', icon: SettingsIcon },
};