import React from 'react';
import loadable from '../../utilities/loadable';
import LoadingIndicator from '../../components/LoadingIndicator';

export default loadable(() => import('./config.container'), {
    fallback: <LoadingIndicator />,
});