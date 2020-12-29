import { TOGGLE_SIDEBAR, SHOW_FETCH_PROGRESS, HIDE_FETCH_PROGRESS } from "../actions/student";

const initialState = {
  showSidebar: false,
  showProfileFetchProgress: false,
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return { ...state, showSidebar: !state.showSidebar };

    case SHOW_FETCH_PROGRESS:
    default:
      return state;
  }
};

export default studentReducer;
