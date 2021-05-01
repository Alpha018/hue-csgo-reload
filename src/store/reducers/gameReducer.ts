import { SET_GAME_STATUS } from '../types';
import {GameStates, GameActions} from '../../types/storeTypes'

const initialState: GameStates = {
  status: '',
};

const gameReducer = (state = initialState, action: GameActions): any => {
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

export default gameReducer