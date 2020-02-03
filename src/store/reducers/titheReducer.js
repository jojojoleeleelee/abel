const initState = {
  tithes: [],
  titheErrors: []
}

const titheReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_TITHE':
      state.tithes.push(action.tithe)
      return {
        ...state
      }
    case 'CREATE_TITHE_ERROR':
      state.titheErrors.push(action.err)
      return {
        ...state
      }
    default:
      return state;
  }
};

export default titheReducer;
