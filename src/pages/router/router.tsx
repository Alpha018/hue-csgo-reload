import React, { FunctionComponent } from 'react';
import {
  Switch,
  Route,
  MemoryRouter,
  Redirect
} from 'react-router-dom';
import {ROUTER_PATH} from './routes';
import {LoadingComponent} from '../loading';
import {BridgeTokenComponent} from '../bridge-token';


export const App: FunctionComponent = () => (
  <MemoryRouter keyLength={12}>
    <Switch>
      <Route
        exact
        path="/"
        render={() => <Redirect to={ROUTER_PATH.INIT_LOADING} />}
      />
      <Route exact path={ROUTER_PATH.INIT_LOADING} component={LoadingComponent}/>
      <Route exact path={ROUTER_PATH.BRIDGE_PAGE} component={BridgeTokenComponent}/>
    </Switch>
  </MemoryRouter>
)
