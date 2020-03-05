import React from 'react';
import PropTypes from 'prop-types';

import Card from 'components/card.component';
import Text from 'components/fields/text.component';
import Select from 'components/fields/select.component';
import Checkbox from 'components/fields/checkbox.component';
import { Item } from 'components/grid.component';

function WebUISettings({ settings, onChange  }) {
    return (
        <>
            <Card title='Language'>
                <Item>
                    <Select label='User Interface Language' value={settings} options={[]} onChange={onChange} />
                </Item>
            </Card>
            <Card title='Web User Interface'>
                <Item sm={12} md={6} lg={6}>
                    <Text label='IP address' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Port' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Use UPnP / NAT-PMP to forward the port from my router' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Use HTTPS instead of HTTP' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Certificate' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Key' value={settings} onChange={onChange} />
                </Item>
            </Card>
            <Card title='Authentication'>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Username' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Password' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Bypass authentication for clients on localhost' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Bypass authentication for clients in whitelisted IP subnets' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='IP subnets' value={settings} onChange={onChange} multiline />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Session timeout' value={settings} onChange={onChange} />
                </Item>
            </Card>
            <Card title='Alternate Web UI'>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Use alternative Web UI' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Files location' value={settings} onChange={onChange} />
                </Item>
            </Card>
            <Card title='Security'>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Enable clickjacking protection' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Enable Cross-Site Request Forgery (CSRF) protection' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Enable Host header validation' name='' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Server domains' value={settings} onChange={onChange} />
                </Item>
            </Card>
            <Card title='DNS'>
                <Item sm={12} md={6} lg={6}>
                    <Checkbox label='Update my dynamic domain name' name='' value={settings} onChange={onChange} />
                </Item>
                <Item>
                    <Select label='DDNS' value={settings} options={[]} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Domain name' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Username' value={settings} onChange={onChange} />
                </Item>
                <Item sm={12} md={6} lg={6}>
                    <Text label='Password' value={settings} onChange={onChange} />
                </Item>
            </Card>
        </>
    )
}

WebUISettings.propTypes = {
    settings: PropTypes.object.isRequired,
}

export default WebUISettings;