import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import PageContainer from 'components/pageContainer';
import LoadingIndicator from 'components/LoadingIndicator';
// import BottomNav from 'containers/settings/bottomNavigation';

import { getRssRules, getRssFeeds, isLoadingRss } from './rss.selectors';
import { rssActions } from './rss.reducer';

class RssContainer extends PureComponent {

    componentDidMount() {
        this.props.getRssRules();
    }

    render() {
        const { isLoadingRss, rssRules, } = this.props;
        console.log({ rssRules })
        
        return (
            <PageContainer>
                {/* only show loading indicator if this is the first load of torrents */}
                {isLoadingRss ? <LoadingIndicator /> : (
                    <>
                        test
                    </>
                )}
            </PageContainer>
        );
    }
}

RssContainer.propTypes = {
    rssRules: PropTypes.array.isRequired,
    isLoadingRss: PropTypes.bool.isRequired,
    getRssRules: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        rssRules: getRssRules(state),
        isLoadingRss: isLoadingRss(state),
    }
};

const mapDispatchToProps = {
    getRssRules: rssActions.getRssRules,
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
)(RssContainer);
