import React from 'react';
import Text from 'components/fields/text.component';

/**
 * if value undef, null, or empty string, show '0', if value -1 show N/A
 */
const ZeroText = ({ value, ...props }) => {
    const _value = (value === undefined || value === null || value === '') ? 0 : (value === -1 ? 'N/A' : value);

    return (
        <Text value={_value} {...props} />
    )
}


export default ZeroText;
