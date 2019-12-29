
import { computedDateTime, computeTimeLeft } from 'utilities/formatters';
import { prettySize, prettySizeTime } from 'utilities/pretty-sizes';

export const formatGeneralInfo = (state, newInfo) => {
    const oldInfo = state.selectedTorrentGeneral || {};

    // only update info if it has changed
    newInfo.additionDateUi = (oldInfo.addition_date === newInfo.addition_date) ? oldInfo.additionDateUi : computedDateTime(newInfo.addition_date, state.dateTimeFormat);
    newInfo.completionDateUi = (oldInfo.completion_date === newInfo.completion_date) ? oldInfo.completionDateUi : computedDateTime(newInfo.completion_date, state.dateTimeFormat);
    newInfo.creationDateUi = (oldInfo.creation_date === newInfo.creation_date) ? oldInfo.creationDateUi : computedDateTime(newInfo.creation_date, state.dateTimeFormat);
    newInfo.lastSeenUi = (oldInfo.last_seen === newInfo.last_seen) ? oldInfo.lastSeenUi : computedDateTime(newInfo.last_seen, state.dateTimeFormat);

    newInfo.timeElapsedUi = (oldInfo.time_elapsed === newInfo.time_elapsed) ? oldInfo.timeElapsedUi : computeTimeLeft(newInfo.time_elapsed);
    newInfo.seedingTimeUi = (oldInfo.seeding_time === newInfo.seeding_time) ? oldInfo.seedingTimeUi : computeTimeLeft(newInfo.seeding_time);
    newInfo.etaUi = (oldInfo.eta === newInfo.eta) ? oldInfo.etaUi : computeTimeLeft(newInfo.eta);
    newInfo.reannounceUi = (oldInfo.reannounce === newInfo.reannounce) ? oldInfo.reannounceUi : computeTimeLeft(newInfo.reannounce);

    newInfo.dlSpeedUi = (oldInfo.dl_speed === newInfo.dl_speed) ? oldInfo.dlSpeedUi : prettySizeTime(newInfo.dl_speed);
    newInfo.dlSpeedAvgUi = (oldInfo.dl_speed_avg === newInfo.dl_speed_avg) ? oldInfo.dlSpeedAvgUi : prettySizeTime(newInfo.dl_speed_avg);
    newInfo.dlLimitUi = (oldInfo.dl_limit === newInfo.dl_limit) ? oldInfo.dlLimitUi : prettySizeTime(newInfo.dl_limit);
    newInfo.upSpeedUi = (oldInfo.up_speed === newInfo.up_speed) ? oldInfo.upSpeedUi : prettySizeTime(newInfo.up_speed);
    newInfo.upSpeedAvgUi = (oldInfo.up_speed_avg === newInfo.up_speed_avg) ? oldInfo.upSpeedAvgUi : prettySizeTime(newInfo.up_speed_avg);
    newInfo.upLimitUi = (oldInfo.up_limit === newInfo.up_limit) ? oldInfo.upLimitUi : prettySizeTime(newInfo.up_limit);

    newInfo.totalDownloadedUi = (oldInfo.total_downloaded === newInfo.total_downloaded) ? oldInfo.totalDownloadedUi : prettySize(newInfo.total_downloaded);
    newInfo.totalDownloadedSessionUi = (oldInfo.total_downloaded_session === newInfo.total_downloaded_session) ? oldInfo.totalDownloadedSessionUi : prettySize(newInfo.total_downloaded_session);
    newInfo.totalUploadedUi = (oldInfo.total_uploaded === newInfo.total_uploaded) ? oldInfo.totalUploadedUi : prettySize(newInfo.total_uploaded);
    newInfo.totalUploadedSessionUi = (oldInfo.total_uploaded_session === newInfo.total_uploaded_session) ? oldInfo.totalUploadedSessionUi : prettySize(newInfo.total_uploaded_session);
    newInfo.totalSizeUi = (oldInfo.total_size === newInfo.total_size) ? oldInfo.totalSizeUi : prettySize(newInfo.total_size);
    newInfo.pieceSizeUi = (oldInfo.piece_size === newInfo.piece_size) ? oldInfo.pieceSizeUi : prettySize(newInfo.piece_size);
    newInfo.totalWastedUi = (oldInfo.total_wasted === newInfo.total_wasted) ? oldInfo.totalWastedUi : prettySize(newInfo.total_wasted);

    return newInfo;
}
