import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import char_invReducer from "./character_inv";
import charReducer from "./character";
import gearReducer from "./gear";
import runReducer from "./run";
import use_invReducer from "./useable_inv";
import user_infoReducer from "./user_info";

const rootReducer = combineReducers({
  session: sessionReducer,
  character: charReducer,
  char_inv: char_invReducer,
  gear: gearReducer,
  run: runReducer,
  use_inv: use_invReducer,
  user_info: user_infoReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
