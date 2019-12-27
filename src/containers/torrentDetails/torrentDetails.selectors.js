import { createSelector } from 'reselect';

export const getTorrentDetails = state => state.torrentDetails;

export const getIsOpen = createSelector(getTorrentDetails, torrentDetails => torrentDetails.isOpen);
export const getSelectedTorrent = createSelector(getTorrentDetails, torrentDetails => torrentDetails.selectedTorrent);

export const getGeneralInfoLoading = createSelector(getTorrentDetails, torrentDetails => torrentDetails.isLoadingGeneral);
export const getGeneralInfo = createSelector(getTorrentDetails, torrentDetails => torrentDetails.selectedTorrentGeneral);

export const getTrackersInfoLoading = createSelector(getTorrentDetails, torrentDetails => torrentDetails.isLoadingTrackers);
export const getTrackersInfo = createSelector(getTorrentDetails, torrentDetails => torrentDetails.selectedTorrentTrackers);
