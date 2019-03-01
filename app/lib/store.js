import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
import { middleware } from './Navigation';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import * as reducers from './reducers';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2,
    whitelist: []
};

const persistedReducers = persistReducer(
    persistConfig,
    combineReducers(reducers)
);

const store = createStore(
    persistedReducers,
    {},
    composeWithDevTools(applyMiddleware(middleware, thunk)),
);

const persistor = persistStore(store);

export { store, persistor };