import { combineReducers } from "redux";

import { reducer as toastr } from "react-redux-toastr";

import location from "./location";
import transport from "./transport";

export default combineReducers({
  location,
  transport,
  toastr,
});
