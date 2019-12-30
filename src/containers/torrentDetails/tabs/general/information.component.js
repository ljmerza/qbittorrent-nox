import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import Card from 'components/card.component';
import Text from 'components/fields/text.component';
import Select from 'components/fields/select.component';
import { Item } from 'components/grid.component';
import { getCategories } from 'containers/torrents/torrents.selectors';

import { torrentDetailsActions } from '../../torrentDetails.reducer';
import { REST_CATEGORY } from 'utilities/torrent-states';

function GeneralTabInformation({ setChangedFields, changedFields, onChange, data, selectedTorrent, categories, changeTorrentCategory }) {

    // editable values
    const name = changedFields.name === undefined ? selectedTorrent.name : changedFields.name;
    const savePath = changedFields.save_path === undefined ? data.save_path : changedFields.save_path;

    // use internal state so we can update this in the UI immediately even though the torrent's value hasnt changed
    // yet - use effect so when the torrent's value DOES change everything is updated accordingly
    const [selectedCategory, setSelectCategory] = useState(selectedTorrent.category);

    useEffect(() => {
        setSelectCategory(selectedTorrent.category);
    }, [selectedTorrent.category]);

    const onCategoryChange = ({ target: { value }}) => {
        setSelectCategory(value);
        changeTorrentCategory(value);
    }

    // remove all and uncategorized then add 'reset cat to beginning
    let [, , ...selectableCategories] = categories;
    selectableCategories.unshift(REST_CATEGORY);

    return (
        <Card title='Information'>
            <Item xs={12} sm={12} md={12}>
                <Text label='Name' name='name' onChange={onChange} value={name} />
            </Item>
            <Item xs={12} sm={12} md={12}>
                <Text label='Save Path' name='save_path' onChange={onChange} value={savePath} />
            </Item>
            <Item>
                <Select label='Category' value={selectedCategory} options={selectableCategories} onChange={onCategoryChange} />
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
    setChangedFields: PropTypes.func.isRequired,
    changedFields: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    data: PropTypes.any,
    selectedTorrent: PropTypes.any,
    categories: PropTypes.array.isRequired,
    changeTorrentCategory: PropTypes.func.isRequired,
};


const mapStateToProps = state => {
    return {
        categories: getCategories(state),
    }
};

function mapDispatchToProps(dispatch) {
    return {
        changeTorrentCategory: hashes => dispatch(torrentDetailsActions.changeTorrentCategory(hashes)),
    };
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(GeneralTabInformation);

