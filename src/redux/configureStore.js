import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';

import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';

export default function configureAppStore(preloadedState, history) {
    const sagaMiddleware = createSagaMiddleware({});

    const store = configureStore({
        reducer: rootReducer,
        middleware: [sagaMiddleware, routerMiddleware(history), ...getDefaultMiddleware()],
        preloadedState,
    });

    sagaMiddleware.run(rootSaga);

    if (process.env.NODE_ENV === 'development' && module.hot) {
        module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer))
    }

    return store;
}