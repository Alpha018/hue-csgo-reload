import React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider, useDispatch} from 'react-redux';
import {store} from './store';
import {setGameStatus} from './store/actions/gameActions';
import {GameState} from './types/gameStatus';
import {App} from './pages/router/router';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CSGOGSI = require('node-csgo-gsi');

const gsi = new CSGOGSI({port: 4000});

const InitialComponent = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  gsi.removeListener('all', () => {});
  gsi.on('all', (data: GameState) => {
    dispatch(setGameStatus({
      status: data,
    }));
  });

  return <App/>;
};

const ConnectedApp = () => (
  <Provider store={store}>
    <InitialComponent/>
  </Provider>
);


ReactDOM.render(<ConnectedApp/>, document.getElementById('root'));
