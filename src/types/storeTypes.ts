import {GameState} from './gameStatus';

export interface GameStates {
  status: GameState
}

export interface GameActions {
  type: string
  status: GameState
}
