import { call, put } from "@redux-saga/core/effects";
import { Creators } from "../ducks/transport";
import api from "../../services/api";
import { toastr } from "react-redux-toastr";

export default function* getTransport(id) {
  try {
    yield put(Creators.transportRequest());
    toastr.info("Pesquisando linha...");

    const response = yield call(api.get, `/api/transport?id=${id}`);

    if (response.data) {
      yield put(Creators.transportSuccess(response.data));
    }
  } catch (err) {
    yield put(Creators.transportError({ err }));
    toastr.error("Erro ao localizar linha");
  }
}
