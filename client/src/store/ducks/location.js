import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

export const { Types, Creators } = createActions({
  locationRequest: [],
  getLocation: ["coords"],
  locationSuccess: ["data"],
  locationError: ["err"],
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
  [Types.LOCATION_ERROR]: error,
  [Types.LOCATION_REQUEST]: request,
  [Types.LOCATION_SUCCESS]: success,
});
