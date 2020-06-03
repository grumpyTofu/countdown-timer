const START_TIMER = 'START_TIMER';
const TICK = 'TICK';
const STOP_TIMER = 'STOP_TIMER';

const initialState = { 
    eventTime: 0,
    timeRemaining: 0,
    interval: null
};

export const actionCreators = {
    startTimer: content => ({ type: START_TIMER, payload: content }),
    stopTimer: () => ({ type: STOP_TIMER })
}

export function reducers(state = initialState, action) {
  switch (action.type) {
    case START_TIMER:
        return {
            ...state,
            eventTime: Date.parse(action.payload), 
            timeRemaining: Date.parse(action.payload) - Date.now(),
            interval: action.interval
        }
    case TICK:
        return {
          ...state, 
          timeRemaining: state.eventTime - Date.now()
        }
    case STOP_TIMER:
        return {
            ...state,
            eventTime: 0,
            timeRemaining: 0,
            interval: action.interval
        }
    default:
        return state;
  }
}

export const middleware = store => next => action => {
    if (action.type === START_TIMER) {
        action.interval = setInterval(() => store.dispatch({ type: TICK }), 1000);
    } else if (action.type === STOP_TIMER) {
        action.interval = clearInterval(action.interval);
    }
    next(action);
};
