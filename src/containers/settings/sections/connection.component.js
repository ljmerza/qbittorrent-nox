import React from 'react';
import PropTypes from 'prop-types';

import Card from 'components/card.component';
import Text from 'components/fields/text.component';
import Select from 'components/fields/select.component';
import Checkbox from 'components/fields/checkbox.component';
import { Container, Item } from 'components/grid.component';

function ConnectionSettings({ settings, onChange  }) {
    return (
        <>
            <Card title='Connections'>
                <Container>
                    <Item sm={12} md={4} lg={4}>
                        <Select label='Enabled Protocol' value={settings} options={[]} onChange={onChange} />
                    </Item>
                </Container>
                <Container>
                    <Item sm={12} md={4} lg={4}>
                        <Text label='Incoming Connections Port' value={settings} onChange={onChange} />
                    </Item>
                </Container>
                <Container>
                    <Item sm={12} md={4} lg={4}>
                        <Checkbox label='Use UPnp / NAT-PMP port frowarding' name='' value={settings} onChange={onChange} />
                    </Item>
                </Container>
                <Container>
                    <Item sm={12} md={4} lg={4}>
                        <Checkbox label='Use different port on each start up' name='' value={settings} onChange={onChange} />
                    </Item>
                </Container>
            </Card>

            <Card title='Limits'>
                <Container>
                    <Item sm={12} md={4} lg={4}>
                    <Checkbox label='Global maximum number of connections' name='' value={settings} onChange={onChange} />
                    </Item>
                    <Item sm={12} md={4} lg={4}>
                        <Text label='' value={settings} onChange={onChange} />
                    </Item>
                </Container>

                <Container>
                    <Item sm={12} md={4} lg={4}>
                        <Checkbox label='Global maximum number of connections per torrent' name='' value={settings} onChange={onChange} />
                    </Item>
                    <Item sm={12} md={4} lg={4}>
                        <Text label='' value={settings} onChange={onChange} />
                    </Item>
                </Container>

                <Container>
                    <Item sm={12} md={4} lg={4}>
                        <Checkbox label='Global maximum number of upload slots' name='' value={settings} onChange={onChange} />
                    </Item>
                    <Item sm={12} md={4} lg={4}>
                        <Text label='' value={settings} onChange={onChange} />
                    </Item>
                </Container>

                <Container>
                    <Item sm={12} md={4} lg={4}>
                        <Checkbox label='Global maximum number of upload slots per torrent' name='' value={settings} onChange={onChange} />
                    </Item>
                    <Item sm={12} md={4} lg={4}>
                        <Text label='' value={settings} onChange={onChange} />
                    </Item>
                </Container>
            </Card>

            <Card title='Proxy'>
                <Container>
                    <Item sm={12} md={4} lg={4}>
                        <Select label='Type' value={settings} options={[]} onChange={onChange} />
                    </Item>
                    <Item sm={12} md={4} lg={4}>
                        <Text label='Host' value={settings} onChange={onChange} />
                    </Item>
                    <Item sm={12} md={4} lg={4}>
                        <Text label='Port' value={settings} onChange={onChange} />
                    </Item>
                </Container>

                <Container>
                    <Item sm={12} md={4} lg={4}>
                        <Checkbox label='Use proxy for peer connections' name='' value={settings} onChange={onChange} />
                    </Item>
                </Container>
                <Container>
                    <Item sm={12} md={4} lg={4}>
                        <Checkbox label='Use proxy only for torrents' name='' value={settings} onChange={onChange} />
                    </Item>
                </Container>

                <Container>
                    <Item sm={12} md={4} lg={4}>
                        <Checkbox label='Authentication' name='' value={settings} onChange={onChange} />
                    </Item>
                </Container>
                <Container>
                    <Item sm={12} md={4} lg={4}>
                        <Text label='Username' value={settings} onChange={onChange} />
                    </Item>
                    <Item sm={12} md={4} lg={4}>
                        <Text label='Password' value={settings} onChange={onChange} />
                    </Item>
                </Container>
            </Card>

            <Card title='IP Filtering'>
                <Container>
                    <Item sm={12} md={4} lg={4}>
                        <Checkbox label='IP Filtering' name='' value={settings} onChange={onChange} />
                    </Item>
                </Container>
                <Container>
                    <Item sm={12} md={4} lg={4}>
                        <Text label='Filter Path (.dat, .p2p, .p2b)' value={settings} onChange={onChange} />
                    </Item>
                </Container>

                <Container>
                    <Item sm={12} md={4} lg={4}>
                        <Checkbox label='Apply to trackers' name='' value={settings} onChange={onChange} />
                    </Item>
                </Container>
                <Container>
                    <Item sm={12} md={12} lg={12}>
                        <Text
                            label='Manually banned IP addresses'
                            value={settings}
                            onChange={onChange}
                            multiline
                            emptyValue
                            autoFocus
                            rows='5'
                        />
                    </Item>
                </Container>
            </Card>
        </>
    )
}

ConnectionSettings.propTypes = {
    settings: PropTypes.object.isRequired,
}

export default ConnectionSettings;