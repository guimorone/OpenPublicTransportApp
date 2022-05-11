import { call, put } from "@redux-saga/core/effects";
import { Creators } from "../ducks/location";
import api from "../../services/api";
import { toastr } from "react-redux-toastr";

export default function* getLocation({ coords }) {
  try {
    yield put(Creators.locationRequest());
    const response = yield call(
      api.get,
      `/api/location?lat=${coords.lat}&lng=${coords.lng}`
    );

    if (response.data) {
      yield put(Creators.locationSuccess(response.data));
      toastr.success("Localização encontrada com sucesso!");
    }
  } catch (err) {
    yield put(Creators.locationError({ err }));
    toastr.error("Erro ao localizar cidade");
  }
}
