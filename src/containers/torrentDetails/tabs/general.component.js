import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { getSelectedTorrent } from '../torrentDetails.selectors';

import GeneralTabActions from './general/actions.component';
import GeneralTabDetails from './general/generalDetails.component';


function GeneralTab({ selectedTorrent }){
    return (
        <>
            {selectedTorrent ? <GeneralTabActions selectedTorrent={selectedTorrent} /> : null}
            <GeneralTabDetails />
        </>
    )
}

GeneralTab.propTypes = {
    selectedTorrent: PropTypes.any,
};

const mapStateToProps = state => {
    return {
        selectedTorrent: getSelectedTorrent(state),
    }
};

export default compose(
    connect(
        mapStateToProps,
        null
    )
)(GeneralTab);
