import { createStore, applyMiddleware, Middleware, Store } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer, {RootState} from './rootReducer';
import {init} from "graphlabs.core.notifier";

init({
  protocol: 'http',
  host: 'localhost',
  port: 54446,
  path: 'RegisterUserActions'
});

export function configureStore(initialState?: RootState): Store<RootState> {
  const middlewares: Middleware[] = [
    thunk,
  ];
  const store = createStore(rootReducer, initialState, composeWithDevTools(
    applyMiddleware(...middlewares),
  ));
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(['./counter', './graph', './intersection'], () => {
      store.replaceReducer(rootReducer);
    });
  }
  return store;
}

export const store = configureStore();
