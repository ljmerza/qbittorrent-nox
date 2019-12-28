import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardContent, Typography} from '@material-ui/core';

import Text from '../../../../components/fields/text.component';
import { Container, Item } from '../../../../components/grid.component';


function GeneralTabInformation({ classes, setChangedFields, changedFields, onChange, data, selectedTorrent }) {

    // editable values
    const name = changedFields.name === undefined ? selectedTorrent.name : changedFields.name;
    const savePath = changedFields.save_path === undefined ? data.save_path : changedFields.save_path;

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography component="h6" variant="h6">Information</Typography>
                <Container>
                    <Item xs={12} sm={12} md={12}>
                        <Text label='Name' name='name' onChange={onChange} value={name} />
                    </Item>
                    <Item xs={12} sm={12} md={12}>
                        <Text label='Save Path' name='save_path' onChange={onChange} value={savePath} />
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
                </Container>
            </CardContent>
        </Card>
    )
}


GeneralTabInformation.propTypes = {
    classes: PropTypes.object.isRequired,
    setChangedFields: PropTypes.func.isRequired,
    changedFields: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    data: PropTypes.any,
    selectedTorrent: PropTypes.any,
};


export default GeneralTabInformation;
