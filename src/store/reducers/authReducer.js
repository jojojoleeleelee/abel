const initState = {
  authError: null,
  authSuccess: null,
  signedIn: false
}

const authReducer = (state = initState, action) => {
  switch(action.type) {
    case 'LOGIN_ERROR':
      return {
        ...state,
        authError: 'Login failed'
      }
    case 'LOGIN_SUCCESS':
      return {
        authSuccess: 'Login success!'
      }
    case 'SIGNOUT_SUCCESS': 
      return initState;
    case 'ALREADY_SIGNED_IN':
      return {
        authSuccess: "Already signed in!"
      }
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        authError: null,
        signedIn: true
      }
    case 'SIGNUP_ERROR':
      return {
        ...state,
        authError: action.err.message
      }
    default:
      return state; 
  }
};

export default authReducer;
