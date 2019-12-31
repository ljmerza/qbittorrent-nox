import React from 'react';
import Text from 'components/fields/text.component';

/**
 * if value is -1 show infinity
 */
const InfinityText = ({ value, ...props }) => {
    const _value = value === -1 ? '∞' : value;

    return (
        <Text value={_value} {...props} />
    )
}


export default InfinityText;
