import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import Card from 'components/card.component';
import Text from 'components/fields/text.component';
import TextSave from 'components/fields/textSave.component';
import MultipleSelect from 'components/fields/multipleSelect.component';
import Select from 'components/fields/select.component';
import { Item } from 'components/grid.component';

import { getTagsWithReset, getCategoriesWithReset } from 'containers/torrents/torrents.selectors';
import { torrentDetailsActions } from 'containers/torrentDetails/torrentDetails.reducer';

function GeneralTabInformation({ 
    generalInfo, 
    selectedTorrent, 
    categories, 
    tags,
    changeTorrentCategory,
    changeTorrentTags,
    changeTorrentName, 
    changeTorrentLocation
}) {
    const onSaveName = ({ target: { value } }) => changeTorrentName(value);
    const onSavePath = ({ target: { value } }) => changeTorrentLocation(value);

    return (
        <Card title='Information'>
            <Item xs={12} sm={12} md={12}>
                <TextSave label='Name' name='name' onSave={onSaveName} value={selectedTorrent.name} />
            </Item>
            <Item xs={12} sm={12} md={12}>
                <TextSave label='Save Path' name='save_path' onSave={onSavePath} value={generalInfo.save_path} />
            </Item>
            <Item>
                <Select label='Category' value={selectedTorrent.categoryUi} options={categories} onChange={changeTorrentCategory} />
            </Item>
            <Item>
                <MultipleSelect label='Tags' value={selectedTorrent.tagsUi} options={tags} onChange={changeTorrentTags} />
            </Item>
            <Item>
                <Text label='Time Active' disabled value={generalInfo.timeElapsedUi} />
            </Item>
            <Item>
                <Text label='ETA' disabled value={generalInfo.etaUi} />
            </Item>
            <Item>
                <Text label='Added On' disabled value={generalInfo.additionDateUi} />
            </Item>
            <Item>
                <Text label='Completed On' disabled value={generalInfo.completionDateUi} />
            </Item>
            <Item>
                <Text label='Last Seen Complete' disabled value={generalInfo.lastSeenUi} />
            </Item>
            <Item>
                <Text label='Pieces' disabled value={`${generalInfo.pieces_num} x ${generalInfo.pieceSizeUi} (have ${generalInfo.pieces_have})`} />
            </Item>
            <Item>
                <Text label='Created By' disabled value={generalInfo.created_by} />
            </Item>
            <Item>
                <Text label='Reannounce In' disabled value={generalInfo.reannounceUi} />
            </Item>
            <Item xs={12} md={8}>
                <Text label='Tracker' disabled value={selectedTorrent.tracker} />
            </Item>
            <Item xs={12} md={12}>
                <Text label='Comment' disabled value={generalInfo.comment} />
            </Item>
        </Card>
    )
}


GeneralTabInformation.propTypes = {
    generalInfo: PropTypes.any,
    selectedTorrent: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    categories: PropTypes.array.isRequired,
    tags: PropTypes.array.isRequired,
    changeTorrentName: PropTypes.func.isRequired,
    changeTorrentLocation: PropTypes.func.isRequired,
    changeTorrentCategory: PropTypes.func.isRequired,
    changeTorrentTags: PropTypes.func.isRequired,
};


const mapStateToProps = state => {
    return {
        categories: getCategoriesWithReset(state),
        tags: getTagsWithReset(state),
    }
};

function mapDispatchToProps(dispatch) {
    return {
        changeTorrentName: name => dispatch(torrentDetailsActions.changeTorrentName(name)),
        changeTorrentLocation: location => dispatch(torrentDetailsActions.changeTorrentLocation(location)),
        changeTorrentCategory: category => dispatch(torrentDetailsActions.changeTorrentCategory(category)),
        changeTorrentTags: tag => dispatch(torrentDetailsActions.changeTorrentTags(tag)),
    };
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(GeneralTabInformation);

