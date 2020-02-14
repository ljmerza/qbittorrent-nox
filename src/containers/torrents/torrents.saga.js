import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from 'utilities/request';
import { formatTorrent, formatServerStats, sumTorrents } from 'utilities/torrent.tools';
import { UNTAGGED, ALL_TAGGED } from 'utilities/torrent-states';

import { toastActions } from 'common/toast/toast.reducer';
import { getLoginApiUrl } from 'containers/login/login.selectors';
import { loginActions } from 'containers/login/login.reducer';

import { getTorrents } from './torrents.selectors';
import { initialState, torrentsActions } from './torrents.reducer';

/**
 * Returns an array with arrays of the given size.
 * @param myArray {Array} Array to split
 * @param chunkSize {Integer} Size of every group
 */
function chunkArray(myArray, chunkSize) {
    const results = [];
    while (myArray.length) {
        results.push(myArray.splice(0, chunkSize));
    }
    return results;
}

/**
 * async process a function
 * @param {Function} processingFunction 
 */
function asyncFunction(processingFunction) {
    return new Promise(resolve => {
        setTimeout(() => {
            const processedChunk = processingFunction();
            resolve(processedChunk);
        }, 0);
    });
}

export default function* torrents() {
    yield takeLatest(`${torrentsActions.torrents}`, function* () {

        const apiUrl = yield select(getLoginApiUrl);
        const torrentState = yield select(getTorrents);

        try {

            // we need to get a full refresh every now and then so if more than X times partial then force a full refresh
            // this is needed because torrents may be deleted somewhere and we never get a notice from the api about this
            // so we force a full update every now and then to make sure
            const rid = torrentState.numberOfConsecutivePartialUpdates > torrentState.maxConsecutivePartialUpdates ? 0 : (torrentState.rid || 0);

            const options = {
                method: 'GET',
                url: `${apiUrl}/${initialState.path}?rid=${rid}`,
            }

            const response = yield call(request, options);

            const { 
                torrents, 
                full_update: fullUpdate, 
                server_state: serverState, 
                categories, 
                tags,
                ...rest
            } = response;

            // we do this in the saga so we can async call chunks of torrents (reducer is NOT async)
            // for large (2000+) list of torrents, processing can take over a second freezing the UI
            // so we break up the array into chunks and async process a chunk at a time to give the
            // event loop a chance to process the UI
            
            // chunk torrents list into pieces so we can async process this X at a time
            const chunks = chunkArray(Object.entries(torrents || {}), 25);

            // if we have a full update then start witha fresh list else start with the current list we have
            // for each torrent from the api - see if we have that torretn already
            // either merge with the old torrent or with a new object
            // if a full update - always add coimbined torrent siunce we are starting fresh
            // if not full update, if new torrent from api and doesnt exsait locally, add to list as well
            // else we are replacing the newly combined torrent with the old torrent day
            let formattedTorrents = fullUpdate ? [] : [...torrentState.torrents];
            
            for(const chunk of chunks){
                yield asyncFunction(() => {
                    chunk.forEach(([hash, newTorrent]) => {
                        newTorrent.hash = hash;

                        // find 'old' torrent and merge with new data (if old not found create empty object)
                        let stateTorrentIndex = formattedTorrents.findIndex(st => st.hash === hash);
                        const stateTorrent = (!fullUpdate && stateTorrentIndex > -1) ? {...formattedTorrents[stateTorrentIndex]} : {};
                        const newTorrentCombined = formatTorrent(newTorrent, stateTorrent, torrentState.dateTimeFormat);

                        if (fullUpdate || stateTorrentIndex === -1){
                            formattedTorrents.push(newTorrentCombined);
                        } else {
                            formattedTorrents[stateTorrentIndex] = newTorrentCombined;
                        }
                    });
                });
            }

            // might as well do the rest of the processing to keep it all together

            // if api gave categories/tags then convert them
            const formattedCategories = !categories ? torrentState.categories : Object.values(categories).reduce((acc, category) => {
                acc.push({ id: category.name, ...category });
                return acc;
            }, []);

            const formattedTags = !tags ? torrentState.tags : tags.reduce((acc, tag) => {
                acc.push({ id: tag, name: tag });
                return acc;
            }, [ALL_TAGGED, UNTAGGED]);

            // format any server stats for the UI
            const formattedServerState = formatServerStats(serverState, torrentState.serverState);

            // reset counter if full update else increment partial updates counter
            const numberOfConsecutivePartialUpdates = fullUpdate ? 0 : torrentState.numberOfConsecutivePartialUpdates + 1;

            yield put({
                type: `${torrentsActions.torrentsSuccess}`, 
                response: {
                    torrents: formattedTorrents,
                    serverState: formattedServerState,
                    categories: formattedCategories,
                    tags: formattedTags,
                    fullUpdate,
                    numberOfConsecutivePartialUpdates,
                    ...sumTorrents(formattedTorrents),
                    ...rest
                } 
            });

        } catch (e) {
            // keep track of how many errors we get - if we get more than X errors in a row then redirect to login screen
            const numberOfConsecutiveErrors = torrentState.numberOfConsecutiveErrors + 1;

            if (numberOfConsecutiveErrors > torrentState.maxConsecutiveErrors){
                yield put({ type: `${torrentsActions.torrentsError}`, response: 0 });
                yield put({ type: `${loginActions.notLoggedIn}` });
            } else {
                yield put({ type: `${torrentsActions.torrentsError}`, response: torrentState.numberOfConsecutiveErrors + 1 });
            }

            yield put({ type: `${toastActions.showError}`, message: e.message, from: 'torrents' });
        }
    });
}