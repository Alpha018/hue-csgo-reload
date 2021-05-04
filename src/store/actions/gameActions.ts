import * as types from '../types';
import {GameActions, GameStates} from '../../types/storeTypes';

export const setGameStatus = (status: GameStates): GameActions => ({
  status: {
    ...status.status
  },
  type: types.SET_GAME_STATUS,
});
