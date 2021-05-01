import { Action } from 'redux';

export interface GameStatus {
    status: any;
}

export interface SetStatusState extends Action {
    type: 'setStatusState';
    status: GameStatus;
}

export type ApplicationAction =
    | SetStatusState
