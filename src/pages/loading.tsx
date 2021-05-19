import React, {FunctionComponent} from 'react';
import { useHistory } from 'react-router-dom';
import {ROUTER_PATH} from './router/routes';
import LoadingTemplate from './template/loading';

export const LoadingComponent: FunctionComponent = () => {

  const token = localStorage.getItem('token');
  const history = useHistory();

  if (!token) {
    history.push(ROUTER_PATH.BRIDGE_PAGE)
  } else {
    history.push(ROUTER_PATH.SELECTED_PAGE)
  }


  return (
    <LoadingTemplate/>
  )
};
