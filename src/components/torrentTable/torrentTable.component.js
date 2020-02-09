import React from 'react';
import PropTypes from 'prop-types';
import { Virtuoso } from 'react-virtuoso';

import TableItem from './tableItem.component';
import { BOTTOM_NAV_HEIGHT } from '../bottomNavigation';

function TorrentTable({ filteredTorrents }){

    return (
        <Virtuoso
            style={{ height: `calc(100vh - ${BOTTOM_NAV_HEIGHT}px)` }}
            totalCount={filteredTorrents.length}
            item={index => {
                const torrent = filteredTorrents[index];
                return <TableItem torrent={torrent} />
            }}
        />
    );
}

TorrentTable.propTypes = {
    filteredTorrents: PropTypes.array.isRequired,
};

export default TorrentTable;