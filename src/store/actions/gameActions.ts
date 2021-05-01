import * as types from '../types';

export const setGameStatus = (status: string): any => ({
  type: types.SET_GAME_STATUS,
  status
});