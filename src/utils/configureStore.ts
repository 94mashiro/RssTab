import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import localforage from 'localforage';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers, { RootState, rootSaga } from '../store';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage: localforage,
  blacklist: ['constant', 'modal'],
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
  }
}

const composeEnhancers = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const persistedReducer = persistReducer(persistConfig, reducers);
const configureStore = (initialState?: RootState) => {
  const middlewares = [sagaMiddleware];
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  const store = createStore(persistedReducer, initialState, enhancer);
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return { store, persistor };
};

export default configureStore;
