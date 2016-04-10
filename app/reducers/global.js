import * as types from '../constants/actionTypes';
import settingsReducer from './settings'
import requestsReducer from './requests'
import requestGroupsReducer from './requestGroups'
import responsesReducer from './responses'
import modalsReducer from './modals'

const initialState = {
  initialized: false,
  loading: false,
  tabs: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    
    case types.GLOBAL_STATE_SAVED:
      return state;
    
    case types.GLOBAL_STATE_RESTORED:
      return Object.assign({}, state, action.state, {initialized: true});
    
    case types.GLOBAL_LOAD_START:
      return Object.assign({}, state, {loading: true});
    
    case types.GLOBAL_LOAD_STOP:
      return Object.assign({}, state, {loading: false});
    
    case types.GLOBAL_SELECT_TAB:
      let tabs = Object.assign({}, state.tabs);
      tabs[action.id] = action.selectedIndex;
      return Object.assign({}, state, {tabs});
    
    default:
      // Send everything else to the child reducers
      const settings = settingsReducer(state.settings, action);
      const requests = requestsReducer(state.requests, action);
      const requestGroups = requestGroupsReducer(state.requestGroups, action);
      const responses = responsesReducer(state.responses, action);
      const modals = modalsReducer(state.modals, action);

      return Object.assign({}, state, {
        settings,
        requestGroups,
        requests,
        responses,
        modals
      });
  }
};