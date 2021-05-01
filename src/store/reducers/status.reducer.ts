import {ApplicationAction, GameStatus} from '../types/gameStatus';

export const initialState: GameStatus = {
  status: {},
}

export const reducer = (state = initialState, action: ApplicationAction) => {
  switch (action.type) {
    case 'setStatusState':
      return Object.assign({}, state, {
        status: action.status
      })
  }
}
