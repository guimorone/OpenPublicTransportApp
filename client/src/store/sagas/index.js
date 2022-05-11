import { all, takeLatest } from "@redux-saga/core/effects";

import { Types as LocationTypes } from "../ducks/location";

import getLocation from "./location";

export default function* rootSaga() {
  return yield all([takeLatest(LocationTypes.GET_LOCATION, getLocation)]);
}
