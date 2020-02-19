
import SwapVertIcon from '@material-ui/icons/SwapVert';
import SettingsInputComponentOutlinedIcon from '@material-ui/icons/SettingsInputComponentOutlined';
import SpeedIcon from '@material-ui/icons/Speed';
import LanguageIcon from '@material-ui/icons/Language';
import WebIcon from '@material-ui/icons/Web';
import MoreOutlinedIcon from '@material-ui/icons/MoreOutlined';

export { default as AdvancedSettings } from './advanced.component';
export { default as BitTorrentSettings } from './bittorrent.component';
export { default as ConnectionSettings } from './connection.component';
export { default as DownloadSettings} from './downloads.component';
export { default as SpeedSettings } from './speed.component';
export { default as WebUISettings } from './webui.component';


export const SECTION_NAMES = {
    downloads: { key: 'downloads', name: 'Downloads', icon: SwapVertIcon },
    connection: { key: 'connection', name: 'Connection', icon: SettingsInputComponentOutlinedIcon },
    speed: { key: 'speed', name: 'Speed', icon: SpeedIcon },
    bitTorrent: { key: 'bittorrent', name: 'Bittorrent', icon: LanguageIcon },
    webUi: { key: 'webui', name: 'Web UI', icon: WebIcon },
    advanced: { key: 'advanced', name: 'Advanced', icon: MoreOutlinedIcon },
};