import React, {FunctionComponent} from 'react';
import { useHistory } from 'react-router-dom';
import {Loading} from '../animations/loading';
import {ROUTER_PATH} from './router/routes';

export const LoadingComponent: FunctionComponent = () => {

  const token = localStorage.getItem('token');
  const history = useHistory();

  if (!token) {
    history.push(ROUTER_PATH.BRIDGE_PAGE)
  } else {
    history.push(ROUTER_PATH.SELECTED_PAGE)
  }


  return (
    <div>
      <Loading>
        <div className="loading">
          <div className="loading-text">
            <span className="loading-text-words">L</span>
            <span className="loading-text-words">O</span>
            <span className="loading-text-words">A</span>
            <span className="loading-text-words">D</span>
            <span className="loading-text-words">I</span>
            <span className="loading-text-words">N</span>
            <span className="loading-text-words">G</span>
          </div>
        </div>
      </Loading>
    </div>
  )
};
