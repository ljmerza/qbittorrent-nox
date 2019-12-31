import { createSelector } from 'reselect';
import { getTorrentsTorrents } from 'containers/torrents/torrents.selectors';
import { DHT_TRACKERS } from './tabs/trackers/tools';

export const getTorrentDetails = state => state.torrentDetails;

export const getIsOpen = createSelector(getTorrentDetails, torrentDetails => torrentDetails.isOpen);

export const getSelectedTorrent = createSelector(
    [getTorrentsTorrents, getTorrentDetails], 
    (torrents, torrentDetails) => {
        return torrents.find(torrent => torrent.hash === torrentDetails.selectedTorrent)
    });

export const getGeneralInfoLoading = createSelector(getTorrentDetails, torrentDetails => torrentDetails.isLoadingGeneral);
export const getGeneralInfo = createSelector(getTorrentDetails, torrentDetails => torrentDetails.selectedTorrentGeneral);

export const getTrackersInfoLoading = createSelector(getTorrentDetails, torrentDetails => torrentDetails.isLoadingTrackers);
export const getTrackersInfo = createSelector(getTorrentDetails, torrentDetails => torrentDetails.selectedTorrentTrackers);

export const getPeersInfoLoading = createSelector(getTorrentDetails, torrentDetails => torrentDetails.isLoadingPeers);
export const getPeersInfo = createSelector(getTorrentDetails, torrentDetails => torrentDetails.selectedTorrentPeers);

export const getFilesInfoLoading = createSelector(getTorrentDetails, torrentDetails => torrentDetails.isLoadingFiles);
export const getFilesInfo = createSelector(getTorrentDetails, torrentDetails => torrentDetails.selectedTorrentFiles);

export const getTrackersInfoNoDht = createSelector(getTorrentDetails, torrentDetails => {
    return torrentDetails.selectedTorrentTrackers.filter(tracker => !DHT_TRACKERS.includes(tracker.url))
});
