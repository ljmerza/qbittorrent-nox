import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { getServerState } from 'containers/torrents/torrents.selectors';
import { Item } from 'components/grid.component';
import Card from 'components/card.component';
import Text from 'components/fields/text.component';
import Checkbox from 'components/fields/checkbox.component';


function Stats({ serverState }) {
    return (
        <>
            <Card title='User Statistics'>
                <Item>
                    <Text label='All-time Upload' disabled value={serverState.allTimeUlUi} />
                </Item>
                <Item>
                    <Text label='All-time Download' disabled value={serverState.allTimeDlUi} />
                </Item>

                <Item sm={12} md={12} lg={12}>
                    <Text label='All-time Share Ratio' disabled value={serverState.global_ratio} />
                </Item>

                <Item>
                    <Text label='Session Upload' disabled value={serverState.upInfoDataUi} />
                </Item>
                <Item>
                    <Text label='Session Download' disabled value={serverState.dlInfoDataUi} />
                </Item>
                <Item sm={12} md={12} lg={12}>
                    <Text label='Session Waste' disabled value={serverState.totalWastedSessionUi} />
                </Item>

                <Item>
                    <Text label='Connected Peers' disabled value={serverState.total_peer_connections} />
                </Item>
                <Item>
                    <Text label='Free Space On Disk' disabled value={serverState.freeSpaceOnDiskUi} />
                </Item>
            </Card>

            <Card title='Speeds'>
                <Item sm={12} md={12} lg={12}>
                    <Checkbox label='Use Alternate Speeds' name='use_alt_speed_limits' value={serverState.use_alt_speed_limits} onChange={() => {}} />
                </Item>
                <Item>
                    <Text label={`Download Rate Limit (${serverState.dlRateLimitUi})`} value={serverState.dl_rate_limit} onChange={() => { }} />
                </Item>
                <Item>
                    <Text label={`Upload Rate Limit (${serverState.upRateLimit})`} value={serverState.up_rate_limit} onChange={() => { }} />
                </Item>
            </Card>

            <Card title='Cache Statistics'>
                <Item>
                    <Text label='Read Cache Hits' disabled value={serverState.read_cache_hits} />
                </Item>
                <Item>
                    <Text label='Total Bugger Size' disabled value={serverState.totalBuffersSizeUi} />
                </Item>
            </Card>

            <Card title='Performance Statistics'>
                <Item>
                    <Text label='Write Cache Overload' disabled value={serverState.write_cache_overload} />
                </Item>
                <Item>
                    <Text label='Read Cache Overload' disabled value={serverState.read_cache_overload} />
                </Item>

                <Item>
                    <Text label='Queued I/O Jobs' disabled value={serverState.queued_io_jobs} />
                </Item>
                <Item>
                    <Text label='Average Time Queued (ms)' disabled value={serverState.average_time_queue} />
                </Item>

                <Item>
                    <Text label='Total Queue Size' disabled value={serverState.total_queued_size} />
                </Item>
            </Card>
        </>
    );

}

const mapStateToProps = state => {
    return {
        serverState: getServerState(state),
    }
};

Stats.propTypes = {
    serverState: PropTypes.object.isRequired,
};

export default compose(
    connect(mapStateToProps, null),
)(Stats);
