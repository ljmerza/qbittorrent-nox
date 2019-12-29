import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import FiltersContainer from 'containers/filters/filters.container';
import TorrentDetails from 'containers/torrentDetails';

import PageContainer from 'components/pageContainer';
import LoadingIndicator from 'components/LoadingIndicator';
import BottomNav from 'components/bottomNavigation';
import TorrentTable from 'components/torrentTable';


import { torrentsActions } from './torrents.reducer';
import { getLoading, getTorrentsTorrents, getFilteredTorrents } from './torrents.selectors';

import {
    getSelectedState,
    getSelectedCategory,
    getSelectedTag,
    getSelectedSort,
    getIsSortDescending,
} from '../filters/filters.selectors';

import { torrentDetailsActions } from '../torrentDetails/torrentDetails.reducer';
import { getConfigInternalRefreshInterval } from '../config/config.selectors';

class TorrentsContainer extends PureComponent {
    componentDidMount(){
        this.startUpdate();
    }

    componentWillUnmount() {
        this.stopUpdate();
    }

    /**
     * if refreshInterval has updated then reset update 
     * torrent interval to that new interval value
     */
    componentDidUpdate(prevProps){
        if (prevProps.refreshInterval !== this.props.refreshInterval){
            this.stopUpdate();
            this.startUpdate();
        }
    }

    startUpdate = () => {
        this.props.getTorrents();

        // load every set interval unless currently loading
        this._interval = setInterval(() => {
            if (this.props.loading) return;
            this.props.getTorrents();
        }, this.props.refreshInterval);
    }

    stopUpdate = () => {
        if (this._interval) clearInterval(this._interval);
    }

    callback = (...args) => console.log({ args })

    render() {
        return (
            <PageContainer>
                {/* only show loading indicator if this is the first load of torrents */}
                {(this.props.torrents.length === 0 && this.props.loading) ? <LoadingIndicator /> :
                    <>
                        <FiltersContainer />
                        <TorrentDetails />
                        <TorrentTable filteredTorrents={this.props.filteredTorrents} selectTorrent={this.props.selectTorrent} />
                        <BottomNav />
                    </>
                }
            </PageContainer>
        );
    }
}

TorrentsContainer.propTypes = {
    torrents: PropTypes.array.isRequired,
    filteredTorrents: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    selectedState: PropTypes.string.isRequired,
    selectedCategory: PropTypes.string.isRequired,
    selectedTag: PropTypes.string.isRequired,
    refreshInterval: PropTypes.number.isRequired,
    selectedSort: PropTypes.string.isRequired,
    isSortDescending: PropTypes.bool.isRequired,
    selectTorrent: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        selectedState: getSelectedState(state),
        selectedCategory: getSelectedCategory(state),
        selectedTag: getSelectedTag(state),
        torrents: getTorrentsTorrents(state),
        filteredTorrents: getFilteredTorrents(state),
        loading: getLoading(state),
        selectedSort: getSelectedSort(state),
        isSortDescending: getIsSortDescending(state),
        refreshInterval: getConfigInternalRefreshInterval(state),
    }
};

function mapDispatchToProps(dispatch) {
    return {
        getTorrents: () => dispatch(torrentsActions.torrents()),
        selectTorrent: torrent => dispatch(torrentDetailsActions.selectTorrent(torrent)),
    };
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(TorrentsContainer);