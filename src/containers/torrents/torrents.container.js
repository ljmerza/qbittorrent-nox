import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import PageContainer from '../../components/pageContainer';
import LoadingIndicator from '../../components/LoadingIndicator';
import BottomNav from '../../components/bottomNavigation';
import TorrentTable from '../../components/torrentTable';
import TorrentDetails from '../torrentDetails';

import { torrentsActions } from './torrents.reducer';
import { getLoading, getTorrentsTorrents } from './torrents.selectors';

import FiltersContainer from '../filters/filters.container';
import {
    getSelectedState,
    getSelectedCategory,
    getSelectedTag,
    getSelectedSort,
    getIsSortDescending,
} from '../filters/filters.selectors';

import { torrentDetailsActions } from '../torrentDetails/torrentDetails.reducer';

import { DEFAULT_UI_STATE } from '../../utilities/torrent-states';
import { generateSortFunction } from '../../utilities/torrent.tools';

class TorrentsContainer extends PureComponent {
    componentDidMount(){
        this.props.getTorrents();

        // load every set interval unless currently loading
        this._interval = setInterval(() => {
            if(this.props.loading) return;
            this.props.getTorrents();
        }, this.props.refreshInterval);
    }

    componentWillUnmount() {
        if (this._interval) clearInterval(this._interval);
    }

    getFilteredTorrents = () => {
        let { torrents, selectedSort, isSortDescending } = this.props;
        torrents = [...torrents];
        
        const { selectedState, selectedCategory, selectedTag } = this.props;

        if (selectedState !== DEFAULT_UI_STATE) {
            torrents = torrents.filter(torrent => torrent.states.includes(selectedState));
        }

        if (selectedCategory) {
            torrents = torrents.filter(torrent => torrent.category === selectedCategory);
        }

        if (selectedTag) {
            torrents = torrents.filter(torrent => torrent.tags.includes(selectedTag));
        }

        // now sort and return
        const sortFunction = generateSortFunction(selectedSort, isSortDescending);
        torrents.sort(sortFunction);

        return torrents;
    }

    render() {
        const { torrents, loading, selectTorrent } = this.props;
        const filteredTorrents = this.getFilteredTorrents();

        return (
            <PageContainer>
                {/* only show loading indicator if this is the first load of torrents */}
                {(torrents.length === 0 && loading) ? <LoadingIndicator /> : 
                    <>
                        <FiltersContainer />
                        <TorrentDetails />
                        <TorrentTable filteredTorrents={filteredTorrents} selectTorrent={selectTorrent} />
                        <BottomNav />
                    </>
                }
            </PageContainer>
        );
    }
}

TorrentsContainer.propTypes = {
    torrents: PropTypes.array.isRequired,
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
        loading: getLoading(state),
        selectedSort: getSelectedSort(state),
        isSortDescending: getIsSortDescending(state),
        refreshInterval: 5000,
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