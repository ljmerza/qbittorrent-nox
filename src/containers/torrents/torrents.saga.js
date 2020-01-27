import { call, put, takeLatest, select } from 'redux-saga/effects';

import request from 'utilities/request';
import { formatTorrent, formatServerStats, sumTorrents } from 'utilities/torrent.tools';
import { UNCATEGORIZED, ALL_CATEGORY, UNTAGGED, ALL_TAGGED } from 'utilities/torrent-states';

import { toastActions } from 'common/toast/toast.reducer';
import { getLoginApiUrl } from 'containers/login/login.selectors';

import { getTorrents } from './torrents.selectors';
import { initialState, torrentsActions } from './torrents.reducer';

/**
 * Returns an array with arrays of the given size.
 * @param myArray {Array} Array to split
 * @param chunkSize {Integer} Size of every group
 */
function chunkArray(myArray, chunkSize) {
    const results = [];
    while (myArray.length) results.push(myArray.splice(0, chunkSize));
    return results;
}

/**
 * 
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
        try {
            const apiUrl = yield select(getLoginApiUrl);
            const torrentState = yield select(getTorrents);

            const options = {
                method: 'GET',
                url: `${apiUrl}/${initialState.path}?rid=${torrentState.rid}`,
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
            // for large (2000+) list of torrents, processing can t ake over a second freezing the UI
            // so we break up the array into chunks and async process a chunk at a time to give the
            // event loop a chance to process the UI
            
            // chunk torrents list into pieces so we can async process this X at a time
            console.time("chunkArray");
            const chunks = chunkArray(Object.entries(torrents || {}), 25);
            console.timeEnd("chunkArray");

            // for each chunk call asyncFunction that will format torrent chunk (returning a promise)
            // then att to array of formatted torrents.
            console.time("formattedTorrents");
            let formattedTorrents = [];
            for(const chunk of chunks){
                const newData = yield asyncFunction(() => {
                    return chunk.map(([hash, torrent]) => {
                        torrent.hash = hash;
                        torrent = formatTorrent(torrent, torrentState.torrents || [], torrentState.dateTimeFormat);
                        return torrent;
                    });
                });
                formattedTorrents.push(...newData);
            }
            console.timeEnd("formattedTorrents");


            // if was not a full update then we didn't get all torrents back
            // we need to merge the new updated torrents with the old torrents
            console.time("fullUpdate");
            if (!fullUpdate) {
                formattedTorrents = torrentState.torrents.map(torrent => {
                    const newTorrent = formattedTorrents.find(ft => ft.hash === torrent.hash);
                    return newTorrent || torrent;
                });
            }
            console.timeEnd("fullUpdate");

            // might as well do the rest of the processing to keep it all together

            // if api gave categories/tags then convert them
            console.time("formattedCategories");
            const formattedCategories = !categories ? torrentState.categories : Object.values(categories).reduce((acc, category) => {
                acc.push({ id: category.name, ...category });
                return acc;
            }, [ALL_CATEGORY, UNCATEGORIZED]);
            console.timeEnd("formattedCategories");

            console.time("formattedTags");
            const formattedTags = !tags ? torrentState.tags : tags.reduce((acc, tag) => {
                acc.push({ id: tag, name: tag });
                return acc;
            }, [ALL_TAGGED, UNTAGGED]);
            console.timeEnd("formattedTags");

            // format any server stats for the UI
            console.time("formatServerStats");
            const formattedServerState = formatServerStats(serverState, torrentState.serverState);
            console.timeEnd("formatServerStats");
            console.log('---------------')

            yield put({
                type: `${torrentsActions.torrentsSuccess}`, 
                response: {
                    torrents: formattedTorrents,
                    serverState: formattedServerState,
                    categories: formattedCategories,
                    tags: formattedTags,
                    ...sumTorrents(formattedTorrents),
                    ...rest
                } 
            });

        } catch (e) {
            yield put({ type: `${torrentsActions.torrentsError}`, from: 'torrents' });
            yield put({ type: `${toastActions.showError}`, message: e.message, from: 'torrents' });
        }
    });
}