const reducer = (state, action) => {
  switch(action.type) {
    case 'error': {
      return {
        ...state,
        status: 'error',
        error: action.error,
      }
    }
    case 'fulfilled': {
      return {
        ...state,
        status: 'fulfilled',
        response: action.response,
      }
    }
    case 'started': {
      return {
        ...state,
        status: 'started',
      }
    }
    default: {
      return state;
    }
  }
};

export default reducer;