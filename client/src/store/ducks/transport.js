import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

export const { Types, Creators } = createActions({
  transportRequest: [],
  getTransport: ["id"],
  transportSuccess: ["data"],
  transportError: ["err"],
});

export const INITIAL_STATE = Immutable({
  data: [],
  loading: false,
  error: false,
});

const request = (state) => state.merge({ loading: true });

const error = (state, { err }) => state.merge({ loading: false, error: err });

const success = (state, { data }) =>
  state.merge({ data, loading: false, error: false });

export default createReducer(INITIAL_STATE, {
  [Types.TRANSPORT_ERROR]: error,
  [Types.TRANSPORT_REQUEST]: request,
  [Types.TRANSPORT_SUCCESS]: success,
});
