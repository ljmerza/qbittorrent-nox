import React from 'react';
import PropTypes from 'prop-types';
import { Virtuoso } from 'react-virtuoso';

import TableItem from './table-item.component';
import { BOTTOM_NAV_HEIGHT } from '../bottomNavigation';

function TorrentTable({ filteredTorrents, selectTorrent }){
    return (
        <Virtuoso
            style={{ height: `calc(100vh - ${BOTTOM_NAV_HEIGHT}px)` }}
            totalCount={filteredTorrents.length}
            item={index => {
                const torrent = filteredTorrents[index];
                return <TableItem torrent={torrent} selectTorrent={selectTorrent} />
            }}
        />
    );
}

TorrentTable.propTypes = {
    filteredTorrents: PropTypes.array.isRequired,
    selectTorrent: PropTypes.func.isRequired,
};

export default React.memo(TorrentTable);