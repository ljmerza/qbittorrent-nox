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
import { getCategories } from 'containers/torrents/torrents.selectors';
import { getTags } from 'containers/torrents/torrents.selectors';

import { torrentDetailsActions } from '../../torrentDetails.reducer';
import { RESET_CATEGORY, RESET_TAGGED } from 'utilities/torrent-states';

function GeneralTabInformation({ 
    data, selectedTorrent, categories, tags,
    changeTorrentCategory, 
    changeTorrentName, 
    changeTorrentLocation
}) {

    console.log({ tags })

    // remove all and uncategorized then add 'reset cat' to beginning
    let [, ...selectableCategories] = categories;
    selectableCategories.unshift(RESET_CATEGORY);

    const onSaveName = ({ target: { value } }) => changeTorrentName(value);
    const onSavePath = ({ target: { value } }) => changeTorrentLocation(value);

    const changeTorrentTags = event => {
        console.log(event);
    }

    // remove all then add 'reset tags' to beginning
    let [, ...selectableTags] = tags;
    selectableTags.unshift(RESET_TAGGED);

    return (
        <Card title='Information'>
            <Item xs={12} sm={12} md={12}>
                <TextSave label='Name' name='name' onSave={onSaveName} value={selectedTorrent.name} />
            </Item>
            <Item xs={12} sm={12} md={12}>
                <TextSave label='Save Path' name='save_path' onSave={onSavePath} value={data.save_path} />
            </Item>
            <Item>
                <Select label='Category' value={selectedTorrent.category} options={selectableCategories} onChange={changeTorrentCategory} />
            </Item>
            <Item>
                <MultipleSelect label='Tags' value={selectedTorrent.tagsUi} options={selectableTags} onChange={changeTorrentTags} />
            </Item>
            <Item>
                <Text label='Time Active' disabled value={data.timeElapsedUi} />
            </Item>
            <Item>
                <Text label='ETA' disabled value={data.etaUi} />
            </Item>
            <Item>
                <Text label='Added On' disabled value={data.additionDateUi} />
            </Item>
            <Item>
                <Text label='Completed On' disabled value={data.completionDateUi} />
            </Item>
            <Item>
                <Text label='Last Seen Complete' disabled value={data.lastSeenUi} />
            </Item>
            <Item>
                <Text label='Pieces' disabled value={`${data.pieces_num} x ${data.pieceSizeUi} (have ${data.pieces_have})`} />
            </Item>
            <Item>
                <Text label='Created By' disabled value={data.created_by} />
            </Item>
            <Item>
                <Text label='Reannounce In' disabled value={data.reannounceUi} />
            </Item>
            <Item xs={12} md={12}>
                <Text label='Comment' disabled value={data.comment} />
            </Item>
        </Card>
    )
}


GeneralTabInformation.propTypes = {
    data: PropTypes.any,
    selectedTorrent: PropTypes.any,
    categories: PropTypes.array.isRequired,
    tags: PropTypes.array.isRequired,
    changeTorrentName: PropTypes.func.isRequired,
    changeTorrentLocation: PropTypes.func.isRequired,
    changeTorrentCategory: PropTypes.func.isRequired,
};


const mapStateToProps = state => {
    return {
        categories: getCategories(state),
        tags: getTags(state),
    }
};

function mapDispatchToProps(dispatch) {
    return {
        changeTorrentName: name => dispatch(torrentDetailsActions.changeTorrentName(name)),
        changeTorrentLocation: location => dispatch(torrentDetailsActions.changeTorrentLocation(location)),
        changeTorrentCategory: hashes => dispatch(torrentDetailsActions.changeTorrentCategory(hashes)),
    };
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(GeneralTabInformation);

