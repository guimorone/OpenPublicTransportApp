import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import Immutable from "seamless-immutable";

import rootReducer from "./ducks";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const configureStore = (initialState) =>
  createStore(
    rootReducer,
    Immutable(initialState),
    applyMiddleware(sagaMiddleware)
  );

const store = configureStore({});

sagaMiddleware.run(rootSaga);

export default store;