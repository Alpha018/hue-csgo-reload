import { GameStatus, SetStatusState } from '../types/gameStatus';

export const setStatusState = (status: GameStatus): SetStatusState => ({
    type: 'setStatusState',
    status,
})
