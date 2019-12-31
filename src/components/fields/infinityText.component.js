import React from 'react';
import Text from 'components/fields/text.component';

/**
 * if value is -1 show infinity
 */
const InfinityText = ({ value, Component, ...props }) => {
    const _value = value === -1 ? '∞' : value;
    Component = Component || Text;

    return (
        <Component value={_value} {...props} />
    )
}


export default InfinityText;
