import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import FiltersContainer from 'containers/filters/filters.container';
import TorrentDetails from 'containers/torrentDetails';

import PageContainer from 'components/pageContainer';
import LoadingIndicator from 'components/LoadingIndicator';
import BottomNav from 'components/bottomNavigation';
import TorrentTable from 'components/torrentTable';

import { getLoading, getTorrentsTorrents, getFilteredTorrents } from './torrents.selectors';
import { torrentDetailsActions } from '../torrentDetails/torrentDetails.reducer';

function TorrentsContainer({ torrents, loading, filteredTorrents, selectTorrent }) {
    const isLoading = torrents.length === 0 && loading;
    
    return (
        <PageContainer>
            {/* only show loading indicator if this is the first load of torrents */}
            {isLoading ? <LoadingIndicator /> : (
                <>
                    <FiltersContainer />
                    <TorrentDetails />
                    <TorrentTable 
                        filteredTorrents={filteredTorrents} 
                        selectTorrent={selectTorrent} 
                    />
                    <BottomNav />
                </>
            )}
        </PageContainer>
    );
}

TorrentsContainer.propTypes = {
    torrents: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    filteredTorrents: PropTypes.array.isRequired,
    selectTorrent: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        torrents: getTorrentsTorrents(state),
        loading: getLoading(state),
        filteredTorrents: getFilteredTorrents(state),
    }
};

function mapDispatchToProps(dispatch) {
    return {
        selectTorrent: torrent => dispatch(torrentDetailsActions.selectTorrent(torrent)),
    };
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(TorrentsContainer);