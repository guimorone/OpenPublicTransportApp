import { all, takeLatest } from "@redux-saga/core/effects";

import { Types as LocationTypes } from "../ducks/location";
import { Types as TransportTypes } from "../ducks/transport";

import getLocation from "./location";
import getTransport from "./transport";

export default function* rootSaga() {
  return yield all(
    [takeLatest(LocationTypes.GET_LOCATION, getLocation)],
    [takeLatest(TransportTypes.GET_TRANSPORT, getTransport)]
  );
}
