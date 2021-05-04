import { SET_GAME_STATUS } from '../types';
import {GameStates, GameActions} from '../../types/storeTypes';

const initialState: GameStates = {
  status: null,
};

const gameReducer = (state = initialState, action: GameActions): GameStates => {
  switch (action.type) {
    case SET_GAME_STATUS:
      return {
        ...state,
        status: action.status,
      };
    default:
      return state;
  }
};

export default gameReducer;
