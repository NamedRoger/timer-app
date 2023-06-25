import { STATUS } from '../config/constants';

/* eslint-disable no-case-declarations */
export const SETS_ACTIONS = {
  setInput: 'setInput',
  reset: 'reset',
  setStatus: 'setStatus',
  incrementSet: 'incrementSet',
  resetSet: 'resetSet',
};

export const initialState = {
  status: STATUS.default.key,
  rounds: 3,
  elapsedRounds: 0,
  sets: 2,
  elapsedSets: 0,
  preparation: 3,
  work: 5,
  rest: 2,
  restBetweenSets: 5,
};

export const reducer = (state, action) => {
  let copy;
  switch (action.type) {
    case SETS_ACTIONS.setInput:
      const { key, value } = action;
      return { ...state, [key]: value };
    case SETS_ACTIONS.incrementSet:
      copy = { ...state };
      if (copy.elapsedRounds < state.rounds) {
        copy.elapsedSets += 1;
      }

      if (copy.elapsedSets === state.sets) {
        copy.elapsedRounds += 1;
        // copy.elapsedSets = 0;
      }
      return { ...copy };
    case SETS_ACTIONS.resetSet:
      copy = { ...state };
      copy.elapsedSets = 0;
      return { ...copy };
    case SETS_ACTIONS.reset:
      return { ...initialState };
    case SETS_ACTIONS.setStatus:
      return { ...state, status: action.value };
    default:
      return state;
  }
};
