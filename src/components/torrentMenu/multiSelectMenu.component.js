import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import MenuOpenIcon from '@material-ui/icons/MenuOpen';

import { torrentDetailsActions } from 'containers/torrentDetails/torrentDetails.reducer';
import { getSelectedTorrent } from 'containers/torrentDetails/torrentDetails.selectors';

function MultiSelectMenu({ selectedTorrent, openDetails }) {
    const noneSelected = selectedTorrent && selectedTorrent.length === 0;
    if (noneSelected) return null;

    return (<MenuOpenIcon onClick={openDetails} />);
}

MultiSelectMenu.propTypes = {
    openDetails: PropTypes.func.isRequired,
    selectedTorrent: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

const mapStateToProps = state => {
    return {
        selectedTorrent: getSelectedTorrent(state),
    }
};
function mapDispatchToProps(dispatch) {
    return {
        openDetails: () => dispatch(torrentDetailsActions.openDetails()),
    };
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(MultiSelectMenu);
