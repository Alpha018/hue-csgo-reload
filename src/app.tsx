import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import {initialState, reducer} from './store/reducers/status.reducer';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {setStatusState} from "./store/actions/status.action";
import {GameStatus} from "./store/types/gameStatus";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const CSGOGSI = require('node-csgo-gsi');


const composeEnhancers = composeWithDevTools({});
const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));

const gsi = new CSGOGSI({port: 4000});

const ConnectedApp = () => {
  return(
    <Provider store={store}>
      <Test/>
    </Provider>
  )
};

const Test = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state: GameStatus) => state.status);
  console.log(status);

  gsi.on('all', (data: any) => {
    // EVENT_NAME is the individual event name below. Look into the example/index.js for more information
    console.log('JUEGO');
    //console.log(data);
    dispatch(setStatusState(data));
  });

  console.log('AQUI!!!');
  console.log(status)

  return (
    <h2>Hello from React!</h2>
  )
}

ReactDOM.render(<ConnectedApp />, document.body);
