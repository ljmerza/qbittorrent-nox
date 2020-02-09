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

function TorrentsContainer({ torrents, loading, filteredTorrents }) {
    const isLoading = torrents.length === 0 && loading;
    
    return (
        <PageContainer>
            {/* only show loading indicator if this is the first load of torrents */}
            {isLoading ? <LoadingIndicator /> : (
                <>
                    <FiltersContainer />
                    <TorrentDetails />
                    <TorrentTable filteredTorrents={filteredTorrents} />
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
};

const mapStateToProps = state => {
    return {
        torrents: getTorrentsTorrents(state),
        loading: getLoading(state),
        filteredTorrents: getFilteredTorrents(state),
    }
};


export default compose(
    connect(
        mapStateToProps,
        null
    )
)(TorrentsContainer);