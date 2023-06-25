import * as React from 'react';
import ConfigurationTimerContext from '../contexts/ConfigurationTimerContext';
import { STATUS } from '../config/constants';
import { SETS_ACTIONS } from '../reducers/setsReducer';

const useTimer = () => {
  const { state: timerState, dispatch } = React.useContext(ConfigurationTimerContext);
  const [timer, setTimer] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);

  const isValid = React.useMemo(() => {
    const { rounds, sets, work, preparation, rest, restBetweenSets } = timerState;
    return rounds > 0 && sets > 0 && work > 0 && preparation > 0 && rest > 0 && restBetweenSets > 0;
  }, [timerState]);

  const play = () => {
    if (!isPlaying) {
      if (isValid) setIsPlaying(true);
      else console.log();
    } else if (isPlaying && isPaused) {
      setIsPaused(false);
    }
  };

  const pause = () => {
    setIsPaused(true);
  };

  const reset = () => {
    setIsPlaying(0);
    setIsPaused(0);
    setTimer(0);
    dispatch({ type: SETS_ACTIONS.reset });
  };

  const incrementSet = () => {
    dispatch({ type: SETS_ACTIONS.incrementSet });
  };

  React.useEffect(() => {
    let interval = null;
    if (isPlaying && !isPaused) {
      if (timer === 0) {
        // eslint-disable-next-line default-case
        switch (timerState.status) {
          case STATUS.default.key:
            dispatch({ type: SETS_ACTIONS.setStatus, value: STATUS.preparation.key });
            setTimer(timerState.preparation);
            break;
          case STATUS.preparation.key:
            dispatch({ type: SETS_ACTIONS.setStatus, value: STATUS.work.key });
            setTimer(timerState.work);
            break;
          case STATUS.work.key:
            dispatch({ type: SETS_ACTIONS.incrementSet });
            if (timerState.elapsedRounds === timerState.rounds) {
              reset();
            } else if (timerState.elapsedSets === timerState.sets - 1) {
              dispatch({ type: SETS_ACTIONS.setStatus, value: STATUS.switchSet.key });
              setTimer(timerState.restBetweenSets);
              dispatch({ type: SETS_ACTIONS.resetSet });
            } else {
              dispatch({ type: SETS_ACTIONS.setStatus, value: STATUS.rest.key });
              setTimer(timerState.rest);
            }
            break;
          case STATUS.rest.key:
            dispatch({ type: SETS_ACTIONS.setStatus, value: STATUS.work.key });
            setTimer(timerState.work);
            break;
          case STATUS.switchSet.key:
            if (timerState.elapsedRounds < timerState.rounds) {
              dispatch({ type: SETS_ACTIONS.setStatus, value: STATUS.work.key });
              setTimer(timerState.work);
            } else {
              reset();
            }
            break;
        }
      }

      interval = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
    } else if (!isPlaying && !isPaused && timer !== 0) {
      clearInterval(interval);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timer, isPaused]);

  return {
    play,
    isPlaying,
    pause,
    isPaused,
    reset,
    timer,
    incrementSet,
  };
};

export default useTimer;
