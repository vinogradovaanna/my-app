import {IAppActions, ISetStatus} from "../../types/IAppActions";
import {SET_STATUS} from "./actions";

export interface App {
  status: boolean;
}

const initialState = {
  status: false,
};

export default (state: App = initialState, action: IAppActions): App => {
  switch (action.type) {
    case SET_STATUS:
      return {
        status: (<ISetStatus> action).payload,
      };
    default:
      return state;
  }
}
